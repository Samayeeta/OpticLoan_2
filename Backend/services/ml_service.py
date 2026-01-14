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

def extract_heuristic_guidance(pdf_path):
    """
    Scans the first 10 pages for keywords to guide the AI.
    Very fast, low RAM.
    """
    signals = []
    try:
        doc = fitz.open(pdf_path)
        for i in range(min(10, len(doc))):
            text = doc[i].get_text()
            if "default" in text.lower() or "penalty" in text.lower() or "fee" in text.lower():
                signals.append(f"Page {i+1}")
        doc.close()
    except:
        pass
    return ", ".join(signals) if signals else "General Audit"

def analyze_document_cloud_forensic(pdf_path):
    """
    Uses the Gemini File API to perform a deep forensic audit. 
    This handles even scanned PDFs and large files without OOM.
    """
    if not client:
        return {"error": "Gemini API client not initialized. Check your API Key."}

    try:
        # 1. Local Guidance
        guidance = extract_heuristic_guidance(pdf_path)
        
        # 2. Upload to Cloud
        print(f"Uploading {os.path.basename(pdf_path)} to Google Forensic Cloud...")
        file_handle = client.files.upload(file=pdf_path)
        
        # Wait for file to reach ACTIVE state
        attempts = 0
        while file_handle.state == "PROCESSING" and attempts < 30:
            time.sleep(2)
            file_handle = client.files.get(name=file_handle.name)
            attempts += 1
            print(f"File status: {file_handle.state}...")

        if file_handle.state == "FAILED":
             return {"error": "Google Cloud failed to process this PDF. It might be corrupted or too large."}

        # 3. Deep Forensic Prompt
        prompt = f"""
        ROLE: Senior Legal Forensic Auditor (Ex-Goldman Sachs / Top-Tier Law Firm).
        
        TASK: 
        Perform a RIGOROUS audit of the attached loan agreement.
        You MUST identify at least 5-10 specific traps, risks, or borrower disadvantages. 
        If the document is safe, you must still identify the 5 most restrictive clauses.
        
        GUIDANCE:
        Local scan flagged high-activity on: {guidance}.

        AUDIT REQUIREMENTS:
        1. CORE FACTS: Interest Rate (APR), Amount, Term, Late Fees, Collateral, Jurisdiction.
        2. TRAPS & RED FLAGS (MANDATORY: Minimum 5): 
           - Look for: Personal Guarantees, Acceleration, Confession of Judgment, Prepayment Penalties, Asset Seizure, Arbitration Waivers.
           - Provide the EXACT QUOTE for each.
        3. EXECUTIVE SUMMARY: A sharp 3-sentence summary of the 'Deadliest Trap' in this deal.
        
        STRICT JSON OUTPUT FORMAT ONLY:
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
                    "reasoning": "Detailed legal implication for the borrower"
                }}
            ],
            "explainability": {{ "confidence": number }}
        }}
        """

        # 4. Generate Content
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=[
                types.Part.from_uri(file_uri=file_handle.uri, mime_type="application/pdf"),
                types.Part.from_text(text=prompt)
            ]
        )

        # Cleanup
        try: client.files.delete(name=file_handle.name)
        except: pass

        # Parse JSON
        clean_text = response.text.strip()
        if "```json" in clean_text:
            clean_text = clean_text.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_text:
             clean_text = clean_text.split("```")[1].split("```")[0].strip()
        
        return json.loads(clean_text)

    except Exception as e:
        print(f"Forensic Audit Error: {str(e)}")
        return {"error": f"Cloud Audit Failed: {str(e)}"}

def process_document(pdf_path):
    """
    Main entry point. Orchestrates the cloud forensic pipeline.
    """
    start_time = time.time()
    
    # Run the rigorous cloud-first audit
    report = analyze_document_cloud_forensic(pdf_path)
    
    if "error" not in report:
        report["performance"] = {
            "total_time": round(time.time() - start_time, 2),
            "status": "Success",
            "method": "Cloud-Native Forensic Stream"
        }
    
    return report
