import os
import re
import json
import time
import fitz  # PyMuPDF
from google import genai
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

def extract_entire_document_text(pdf_path):
    """
    Extracts text from EVERY page of the PDF using PyMuPDF.
    Extremely memory-efficient and fast.
    """
    full_text = []
    try:
        doc = fitz.open(pdf_path)
        print(f"Extracting text from all {len(doc)} pages...")
        for i in range(len(doc)):
            page = doc.load_page(i)
            page_text = page.get_text()
            if page_text.strip():
                full_text.append(f"--- PAGE {i+1} ---\n{page_text}")
            else:
                full_text.append(f"--- PAGE {i+1} ---\n[Image-based page: No selectable text found]")
        doc.close()
        return "\n\n".join(full_text)
    except Exception as e:
        print(f"Text Extraction Error: {e}")
        return ""

def analyze_document_rigorous(text_content):
    """
    Sends the entire document text to Gemini with a highly aggressive forensic prompt.
    """
    if not client:
        return {"error": "Gemini API client not initialized"}

    if not text_content or len(text_content) < 100:
        return {"error": "The document appears to have no selectable text. Please ensure it is not a pure image scan."}

    prompt = f"""
    ROLE: Senior Forensic Loan Auditor & Predatory Lending Specialist.
    
    TASK: 
    I will provide the FULL TEXT of a loan agreement below. You MUST perform a rigorous, 
    hostile audit from the perspective of the borrower. 
    
    MANDATORY REQUIREMENT: 
    You MUST identify and detail at least 5-10 specific "Traps", "Red Flags", or "Unfair Clauses". 
    If you find fewer than 5, you are not looking hard enough. 

    AREAS TO ATTACK:
    - Default Interest Hikes (e.g., 24%+ rates)
    - Acceleration Clauses (Total balance due on one missed payment)
    - "Confession of Judgment" (Giving up the right to defend in court)
    - Hidden Fees (Processing, Origination, "Service" fees)
    - Jury Trial Waivers & Mandatory Arbitration
    - Personal Guarantees & Asset Seizures

    FULL DOCUMENT TEXT:
    {text_content}

    AUDIT REQUIREMENTS:
    1. CORE FACTS: Extract Interest Rate (APR), Loan Amount, Term, Late Penalties, Collateral, and Jurisdiction.
    2. RED FLAGS (MIN 5): Provide Category, EXACT QUOTE, and a "Why this is a Trap" explanation.
    3. SUMMARY: A 3-sentence summary of the biggest danger in this specific deal.
    4. VERDICT: Trust Score (0-100) and Verdict (Safe/Caution/Critical).

    OUTPUT FORMAT (STRICT JSON ONLY):
    {{
        "document_metadata": {{ 
            "trust_score": number, 
            "verdict": "Safe" | "Caution" | "Critical",
            "summary": "string" 
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
                "text_found": "EXACT QUOTE",
                "reasoning": "Detailed explanation"
            }}
        ],
        "explainability": {{ "confidence": number }}
    }}
    """

    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt
        )
        
        clean_text = response.text.strip()
        if "```json" in clean_text:
            clean_text = clean_text.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_text:
             clean_text = clean_text.split("```")[1].split("```")[0].strip()
        
        return json.loads(clean_text)
    except Exception as e:
        print(f"API Error: {e}")
        return {"error": f"Forensic audit failed: {str(e)}"}

def process_document(pdf_path):
    """
    Main Orchestrator: Full-Doc Extraction + Rigorous Analysis.
    Optimized for Render Free Tier (Stable & Fast).
    """
    start_time = time.time()
    
    # 1. Extract ALL text (PyMuPDF is very safe for RAM)
    full_text = extract_entire_document_text(pdf_path)
    
    # 2. Deep Forensic Analysis
    final_report = analyze_document_rigorous(full_text)
    
    if "error" not in final_report:
        final_report["performance"] = {
            "total_time": round(time.time() - start_time, 2),
            "method": "Full-Doc Direct Analysis",
            "status": "Success"
        }
    
    return final_report
