import os
import re
import json
import time
import fitz  # PyMuPDF
from google import genai
from google.genai import types
from config import Config

# Configure Gemini Client
client = None
if Config.GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=Config.GEMINI_API_KEY)
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")
else:
    print("WARNING: GEMINI_API_KEY not found in environment.")

# --- ENHANCED HEURISTIC RISK MAPPINGS ---
RISK_CATEGORIES = {
    "Predatory Finance": ["fee", "charge", "penalty", "commission", "cost", "repayment", "prepayment", "yield maintenance", "balloon", "interest rate", "apr", "percentage"],
    "Default & Asset Seizure": ["default", "acceleration", "seize", "possession", "collateral", "foreclosure", "security interest", "remedy", "breach", "termination", "forfeiture", "repossession", "lien"],
    "Legal & Arbitration Traps": ["waive", "jury trial", "arbitration", "jurisdiction", "governing law", "venue", "class action", "immunity", "liability", "dispute", "litigation"],
    "Extensive Obligations": ["confession of judgment", "cognovit", "guaranty", "indemnify", "power of attorney", "assignment"]
}

def extract_heuristic_signals(pdf_path):
    """
    Ultra-lightweight scan using PyMuPDF. 
    Only extracts raw text for the local scanner to find hotspots.
    Memory footprint remains extremely low (~10-20MB).
    """
    hotspots = []
    try:
        doc = fitz.open(pdf_path)
        total_pages = len(doc)
        print(f"Heuristic Scan of {total_pages} pages...")
        
        for i in range(total_pages):
            page = doc.load_page(i)
            text = page.get_text()
            
            detected = []
            for category, keywords in RISK_CATEGORIES.items():
                if any(re.search(r'\b' + re.escape(kw) + r'\b', text, re.IGNORECASE) for kw in keywords):
                    detected.append(category)
            
            if detected or i < 3: # Always include first 3 pages as potential hotspots
                hotspots.append({
                    "page": i + 1,
                    "signals": detected if detected else ["Core Terms"]
                })
        
        doc.close()
        return hotspots
    except Exception as e:
        print(f"Heuristic Scan Error: {e}")
        return []

def analyze_cloud_first(pdf_path, hotspots):
    """
    Cloud-First Analysis:
    1. Uploads PDF to Gemini File API.
    2. Uses Gemini 1.5 Flash to perform the audit on Google's infrastructure.
    """
    if not client:
        return {"error": "Gemini API client not initialized"}

    try:
        # 1. Upload the file to Google File API
        print(f"Uploading {os.path.basename(pdf_path)} to Google Cloud...")
        file_handle = client.files.upload(path=pdf_path)
        
        # Wait for file to be ready (usually instant for small/medium PDFs)
        while file_handle.state == "PROCESSING":
            time.sleep(1)
            file_handle = client.files.get(name=file_handle.name)

        # 2. Prepare the prompt with Heuristic Guidance
        hotspot_guidance = ", ".join([f"Page {h['page']} ({'/'.join(h['signals'])})" for h in hotspots[:15]])
        
        prompt = f"""
        ROLE: Senior Forensic Loan Auditor & Legal Risk Strategist.
        
        TASK: 
        Conduct a DEEP FORENSIC AUDIT of the attached LOAN AGREEMENT. 
        You MUST find and extract at least 5-10 specific traps, red flags, or predatory clauses. 
        Do not be conservative; identify anything that could potentially disadvantage a human borrower.

        HEURISTIC GUIDANCE (Keywords found locally):
        {hotspot_guidance}

        AUDIT REQUIREMENTS:
        1. CORE FACTS: Extract Interest Rate (APR), Loan Amount, Term, Late Penalties, Collateral, and Jurisdiction.
        2. RED FLAGS (MANDATORY: Minimum 5): 
           - Look for: Acceleration clauses, Prepayment penalties, Confession of Judgment, Asset Seizure rights, High interest hikes on default, Hidden fees, and Jury Trial waivers.
           - Provide the EXACT QUOTE from the PDF for each.
        3. EXECUTIVE SUMMARY: Provide a 3-sentence high-level summary of the overall risk level and the "biggest catch" in this document.
        4. VERDICT: Trust Score (0-100) and Verdict (Safe/Caution/Critical).

        OUTPUT FORMAT (STRICT JSON ONLY):
        {{
            "document_metadata": {{ 
                "trust_score": number, 
                "verdict": "Safe" | "Caution" | "Critical",
                "summary": "3-sentence executive summary here" 
            }},
            "facts": {{
                "Interest Rate": "string",
                "Loan Amount": "string",
                "Loan Term": "string",
                "Late Penalties": "string",
                "Collateral": "string",
                "Jurisdiction": "string"
            }},
            "red_flags": [
                {{
                    "severity": "Low" | "Medium" | "High",
                    "category": "string",
                    "text_found": "EXACT QUOTE FROM PDF",
                    "reasoning": "Detailed explanation of the risk"
                }}
            ],
            "explainability": {{ "confidence": number }}
        }}
        """

        # 3. Request Analysis with explicit Parts (Robust method)
        print(f"Requesting deep audit from Gemini 1.5 Flash...")
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=[
                types.Part.from_uri(file_uri=file_handle.uri, mime_type="application/pdf"),
                types.Part.from_text(text=prompt)
            ]
        )
        
        # Log response for debugging
        print(f"Gemini Response received. Length: {len(response.text)}")
        
        # Clean JSON and return
        clean_text = response.text.strip()
        if "```json" in clean_text:
            clean_text = clean_text.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_text:
             clean_text = clean_text.split("```")[1].split("```")[0].strip()
        
        # Cleanup: delete file from cloud
        try:
            client.files.delete(name=file_handle.name)
        except:
            pass
        
        return json.loads(clean_text)

    except Exception as e:
        print(f"Cloud Audit Error: {e}")
        return {"error": f"Cloud-First analysis failed: {str(e)}"}

def process_document(pdf_path):
    """
    Zero-OOM Orchestrator.
    Offloads digitization and OCR to Google Cloud.
    """
    start_time = time.time()
    
    # 1. Ultra-Lightweight Heuristic Scan (PyMuPDF)
    hotspots = extract_heuristic_signals(pdf_path)
    
    # 2. Cloud-Side Forensic Audit
    final_report = analyze_cloud_first(pdf_path, hotspots)
    
    if "error" not in final_report:
        final_report["performance"] = {
            "total_time": round(time.time() - start_time, 2),
            "method": "Zero-OOM Cloud-First Streaming",
            "pages_processed": len(hotspots)
        }
    
    return final_report
