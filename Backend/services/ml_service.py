import os
import pytesseract
from pdf2image import convert_from_path
import google.generativeai as genai
import json
import time

# Configure Gemini
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
    # gemini-1.5-flash was missing, using gemini-flash-latest instead
    model = genai.GenerativeModel('gemini-flash-latest')

def extract_text_tesseract(pdf_path, max_pages=2):
    """
    Convert PDF to images and extract text using Tesseract OCR.
    """
    try:
        images = convert_from_path(pdf_path)
        
        # Limit pages to avoid hitting token limits during testing
        if max_pages:
            print(f"Limiting OCR to first {max_pages} pages...")
            images = images[:max_pages]
            
        text = ""
        for i, image in enumerate(images):
            # OCR each page
            page_text = pytesseract.image_to_string(image)
            text += f"\n--- Page {i+1} ---\n{page_text}"
        return text
    except Exception as e:
        print(f"Error in Tesseract OCR: {e}")
        raise e

def analyze_text_batches(text, chunk_size=20000):
    """
    analyze text in batches using Gemini to avoid token limits.
    """
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    
    combined_result = {
        "document_metadata": {"trust_score": 100, "verdict": "Safe"}, # Default, to be updated
        "facts": {},
        "red_flags": [],
        "explainability": {"confidence": 0.0}
    }
    
    print(f"Processing {len(chunks)} chunks...")

    for i, chunk in enumerate(chunks):
        prompt = f"""
        You are a legal auditor. Extract key loan facts and identify "Red Flags" (predatory clauses) from the following text chunk (Part {i+1}/{len(chunks)}).
        
        Text:
        {chunk}
        
        Return JSON with:
        - facts: {{ key: value }} (Update known facts)
        - red_flags: [ {{ severity, category, text_found, reasoning }} ]
        """
        
        # Retry logic
        retries = 3
        for attempt in range(retries):
            try:
                response = model.generate_content(
                    prompt, 
                    generation_config=genai.GenerationConfig(response_mime_type="application/json")
                )
                
                chunk_result = json.loads(response.text)
                
                # Merge results (Simplified merging logic)
                if "facts" in chunk_result:
                    combined_result["facts"].update(chunk_result["facts"])
                if "red_flags" in chunk_result:
                    combined_result["red_flags"].extend(chunk_result["red_flags"])
                
                break # Success
            except Exception as e:
                if "429" in str(e) and attempt < retries - 1:
                    wait_time = (2 ** attempt) * 10
                    print(f"Quota exceeded. Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    print(f"Error processing chunk {i}: {e}")
                    # Continue to next chunk or fail? For now log and continue
                    break
        
        # Rate limit spacing (increased to avoid RPM limits)
        time.sleep(5) 

    return combined_result

def process_document(pdf_path):
    """
    Orchestrate OCR and Analysis.
    """
    start_time = time.time()
    
    # 1. OCR
    print(f"Starting OCR for {pdf_path}...")
    raw_text = extract_text_tesseract(pdf_path)
    print(f"OCR Complete. Extracted {len(raw_text)} chars.")
    
    # 2. Analysis
    print("Starting Gemini Analysis...")
    analysis_result = analyze_text_batches(raw_text)
    
    analysis_result["performance"] = {
        "ocr_time": 0, # Placeholder
        "total_time": time.time() - start_time
    }
    
    return analysis_result
