import os
import pytesseract
from pdf2image import convert_from_path
import json
import time
import pdfplumber
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

def extract_text_smart(pdf_path):
    """
    Extract text using pdfplumber (fast) and fallback to Tesseract (OCR) for scanned pages.
    Optimized for memory by using lower DPI.
    """
    all_text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                
                # If pdfplumber finds very little text, try OCR as fallback for this page
                if not page_text or len(page_text.strip()) < 50:
                    print(f"Page {i+1} seems to be scanned, falling back to OCR (Low RAM mode)...")
                    # Memory optimization: dpi=100 is usually enough for OCR but uses much less RAM
                    images = convert_from_path(pdf_path, first_page=i+1, last_page=i+1, dpi=100)
                    if images:
                        page_text = pytesseract.image_to_string(images[0])
                
                all_text += f"\n--- Page {i+1} ---\n{page_text or '[No text found]'}"
        return all_text
    except Exception as e:
        print(f"Error in Smart Text Extraction: {e}")
        # Final fallback to lower-DPI OCR
        try:
            images = convert_from_path(pdf_path, dpi=100)
            return "\n".join([pytesseract.image_to_string(img) for img in images])
        except Exception as oom_err:
            print(f"Critical OOM during fallback OCR: {oom_err}")
            return "Error: Document too large for memory limits."

def analyze_document_gemini(text):
    """
    Use Gemini 1.5 Flash via new SDK for high-speed analysis.
    """
    if not client:
        return {"error": "Gemini client not initialized. Check API key."}

    prompt = f"""
    You are a professional loan agreement auditor. Analyze the following loan document text.
    
    TEXT:
    {text[:30000]}

    INSTRUCTIONS:
    1. Extract core loan facts (Interest Rate, Loan Amount, Loan Term, Late Penalties, Collateral, Jurisdiction).
    2. Identify specific "Red Flags" or predatory clauses.
    3. For each Red Flag, explain why it is risky.
    4. Provide a trust score (0-100) and a verdict (Safe, Caution, Critical).

    OUTPUT FORMAT (Strict JSON only):
    {{
        "document_metadata": {{ "trust_score": number, "verdict": "Safe" | "Caution" | "Critical" }},
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
                "text_found": "string",
                "reasoning": "string"
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
        
        # Extract JSON
        clean_response = response.text.strip()
        if "```json" in clean_response:
            clean_response = clean_response.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_response:
             clean_response = clean_response.split("```")[1].split("```")[0].strip()
        
        return json.loads(clean_response)
    except Exception as e:
        print(f"Gemini Analysis Error: {e}")
        return {"error": f"AI Generation failed: {str(e)}"}

def process_document(pdf_path):
    """
    Orchestrate Memory-Efficient Gemini Pipeline.
    """
    start_time = time.time()
    
    # 1. Memory-Aware Smart Extraction
    raw_text = extract_text_smart(pdf_path)
    
    # 2. Cloud Analysis
    final_analysis = analyze_document_gemini(raw_text)
    
    if "error" not in final_analysis:
        final_analysis["performance"] = {
            "total_time": round(time.time() - start_time, 2),
            "model": "gemini-1.5-flash",
            "optimized_ram": True
        }
    
    return final_analysis
