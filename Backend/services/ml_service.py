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
        # 1. Local Guidance (Scan first 15 pages for deeper context)
        guidance = extract_heuristic_guidance(pdf_path)
        
        # 2. Upload to Cloud
        print(f"Uploading {os.path.basename(pdf_path)} to Google Forensic Cloud...")
        file_handle = client.files.upload(file=pdf_path)
        
        # Wait for file to reach ACTIVE state (Mandatory for successful analysis)
        print(f"Gemini processing PDF on cloud infrastructure...")
        attempts = 0
        while file_handle.state != "ACTIVE" and attempts < 60:
            if file_handle.state == "FAILED":
                return {"error": "Google Cloud failed to process this PDF. The file might be corrupted or in an unsupported format."}
            time.sleep(2)
            file_handle = client.files.get(name=file_handle.name)
            attempts += 1
            
        if file_handle.state != "ACTIVE":
             return {"error": "Cloud processing timed out. The document is too complex for the current session."}

        # 3. Deep Forensic Prompt (Aggressive & Mandatory)
        prompt = f"""
        ROLE: Lead Forensic Auditor & Legal Strategist.
        
        CRITICAL MISSION: 
        Analyze the ATTACHED 50+ page loan document. 
        You are being hired to protect the borrower from unfair terms. 

        GUIDANCE:
        Our preliminary scan found high activity on: {guidance}. 
        However, you MUST scan the ENTIRE document from Page 1 to the end.

        AUDIT MANDATE (DO NOT FAIL THESE):
        1. YOU MUST FIND AND EXTRACT AT LEAST 5-10 RED FLAGS. 
        Identify even the most subtle disadvantages (e.g., specific wording in "Defaults", "Governing Law", "Indemnification", "Arbitration").
        
        2. FOR EACH RED FLAG:
           - Provide a precise 'category'.
           - Extract the EXACT QUOTE from the document.
           - Explain the 'reasoning' in "scary" terms—what happens to the borrower if things go wrong?

        3. CORE FACTS:
           - Extract Interest Rate (APR), Loan Amount, Term, Late Fees, and Collateral.

        4. EXECUTIVE SUMMARY:
           - Write a sharp, 3-sentence summary of the "Hidden Killers" in this agreement.

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
                    "text_found": "QUOTED TEXT",
                    "reasoning": "Legal and financial implication"
                }}
            ],
            "explainability": {{ "confidence": number }}
        }}
        """

        # 4. Generate Content (Using gemini-2.0-flash for high compatibility)
        print(f"Requesting deep audit from Gemini...")
        
        # Comprehensive Fallback Chain
        fallback_models = ['gemini-2.0-flash', 'gemini-1.5-flash-002', 'gemini-1.5-pro', 'gemini-1.5-flash']
        response = None
        last_err = None

        for model_id in fallback_models:
            try:
                print(f"Attempting audit with model: {model_id}...")
                response = client.models.generate_content(
                    model=model_id,
                    contents=[
                        types.Part.from_uri(file_uri=file_handle.uri, mime_type="application/pdf"),
                        types.Part.from_text(text=prompt)
                    ]
                )
                if response:
                    print(f"Successfully analyzed with {model_id}")
                    break
            except Exception as e:
                print(f"Model {model_id} failed: {str(e)}")
                last_err = e
                continue
        
        if not response:
            # If all failed, let's try to see WHAT models are available to this key
            available_names = []
            try:
                ms = client.models.list()
                available_names = [m.name for m in ms]
            except:
                available_names = ["Could not list models"]
            
            raise Exception(f"All models failed with 404. Available models for your key: {', '.join(available_names)}")

        # Cleanup Cloud File
        try: 
            client.files.delete(name=file_handle.name)
            print("Cloud file cleaned up.")
        except: 
            pass

        # Parse JSON
        clean_text = response.text.strip()
        if "```json" in clean_text:
            clean_text = clean_text.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_text:
             clean_text = clean_text.split("```")[1].split("```")[0].strip()
        
        parsed_result = json.loads(clean_text)
        # Ensure we always return at least some facts/flags even if empty keys
        if "facts" not in parsed_result: parsed_result["facts"] = {}
        if "red_flags" not in parsed_result: parsed_result["red_flags"] = []
        
        return parsed_result

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
