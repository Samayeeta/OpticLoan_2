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

def extract_text_tesseract(pdf_path, max_pages=None):
    """
    Convert PDF to images and extract text using Tesseract OCR.
    """
    try:
        images = convert_from_path(pdf_path)
        
        # Limit pages only if specified (default None for production)
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

def analyze_text_batches(text, chunk_size=10000):
    """
    MAP PHASE: Extract raw facts/flags from chunks.
    """
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    map_results = []
    
    print(f"Map Phase: Processing {len(chunks)} chunks...")

    for i, chunk in enumerate(chunks):
        prompt = f"""
        (Part {i+1}/{len(chunks)}) - EXTRACT RAW FINDINGS
        Analyze this section of a loan document. Extract every significant fact and any predatory/hidden clauses.
        
        Focus on:
        - Penalties, interest rates, repayment rules, collateral, and legal jurisdiction.
        
        Return JSON format:
        {{
            "raw_facts": {{ "key": "value" }},
            "potential_flags": [ {{ "severity": "High/Med/Low", "category": "...", "text": "...", "reason": "..." }} ]
        }}
        
        TEXT:
        {chunk}
        """
        
        # Retry logic with backoff
        for attempt in range(3):
            try:
                response = model.generate_content(
                    prompt, 
                    generation_config=genai.GenerationConfig(response_mime_type="application/json")
                )
                map_results.append(json.loads(response.text))
                break
            except Exception as e:
                if "429" in str(e) and attempt < 2:
                    time.sleep(15 * (attempt + 1)) # Wait longer for large docs
                else:
                    print(f"Skipping chunk {i} due to error: {e}")
                    break
        
        time.sleep(5) # Rate limit padding

    return map_results

def reduce_results(map_results):
    """
    REDUCE PHASE: deduplicate and synthesize all findings.
    """
    print("Reduce Phase: Synthesizing findings...")
    
    combined_raw = json.dumps(map_results)
    
    prompt = f"""
    SYNTHESIZE LOAN AUDIT RESULTS
    You are given a list of raw findings extracted from different parts of a loan document.
    Your job is to deduplicate them, resolve contradictions, and provide a final cohesive report.
    
    Data:
    {combined_raw}
    
    Return a single JSON object with this exact structure:
    {{
        "document_metadata": {{ "trust_score": 0-100, "verdict": "Safe/Caution/Critical" }},
        "facts": {{ "Key Name": "Cleaned Value" }},
        "red_flags": [ {{ "severity": "...", "category": "...", "text_found": "...", "reasoning": "..." }} ],
        "explainability": {{ "confidence": 0.0-1.0 }}
    }}
    """
    
    try:
        response = model.generate_content(
            prompt, 
            generation_config=genai.GenerationConfig(response_mime_type="application/json")
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Error in reduction phase: {e}")
        # Return a fallback merge if Gemini fails
        return {"error": "Reduction failed", "raw_data": map_results}

def process_document(pdf_path):
    """
    Orchestrate Map-Reduce Pipeline.
    """
    start_time = time.time()
    
    # 1. OCR (Full document)
    raw_text = extract_text_tesseract(pdf_path)
    
    # 2. Map Phase (Extraction)
    map_data = analyze_text_batches(raw_text)
    
    # 3. Reduce Phase (Synthesis)
    final_analysis = reduce_results(map_data)
    
    final_analysis["performance"] = {
        "chunks_processed": len(map_data),
        "total_time": time.time() - start_time
    }
    
    return final_analysis
