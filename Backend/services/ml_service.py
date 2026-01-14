import os
import re
import json
import time
import pdfplumber
import pytesseract
from pdf2image import convert_from_path
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

# --- HEURISTIC RISK SIGNALS ---
RISK_CATEGORIES = {
    "Financial Traps": ["fee", "charge", "penalty", "commission", "cost", "repayment", "prepayment", "yield maintenance", "balloon", "interest rate", "apr", "percentage"],
    "Default & Seizure": ["default", "acceleration", "seize", "possession", "collateral", "foreclosure", "security interest", "remedy", "breach", "termination"],
    "Legal Waivers": ["waive", "jury trial", "arbitration", "jurisdiction", "governing law", "venue", "class action", "immunity", "liability"],
    "Hidden Obligations": ["confession of judgment", "cognovit", "guaranty", "indemnify", "power of attorney", "assignment"]
}

def extract_text_full_doc(pdf_path):
    """
    Extract text from the entire document page-by-page.
    Uses pdfplumber for speed and fallback OCR for scanned pages.
    """
    all_text = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"Scanning document ({len(pdf.pages)} pages)...")
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                
                # If no text, OCR the page at low resolution to save RAM
                if not page_text or len(page_text.strip()) < 50:
                    try:
                        images = convert_from_path(pdf_path, first_page=i+1, last_page=i+1, dpi=90)
                        if images:
                            page_text = pytesseract.image_to_string(images[0])
                    except:
                        page_text = "[Image page - OCR failed]"
                
                all_text.append({"page": i+1, "content": page_text or ""})
        return all_text
    except Exception as e:
        print(f"Error in text extraction: {e}")
        return []

def heuristic_scanner(pages):
    """
    Scans pages for risk signals and extracts relevant windows.
    Returns a list of high-signal text chunks.
    """
    high_signal_chunks = []
    
    # CORE FACTS: Always include first 3 pages (where most facts live)
    fact_pages = pages[:3]
    for p in fact_pages:
        high_signal_chunks.append({
            "source": f"Page {p['page']} (Core Facts Search)",
            "text": p["content"][:4000] # Slightly larger window for facts
        })

    # RISK DISCOVERY: Scan remaining pages for traps
    for page in pages[3:]: 
        content = page["content"]
        page_num = page["page"]
        
        found_signals = []
        for category, keywords in RISK_CATEGORIES.items():
            for kw in keywords:
                if re.search(r'\b' + re.escape(kw) + r'\b', content, re.IGNORECASE):
                    found_signals.append(category)
                    break 
        
        if found_signals:
            high_signal_chunks.append({
                "source": f"Page {page_num} (Signals: {', '.join(found_signals)})",
                "text": content[:3000]
            })
            
    # Limit to top 15 hotspots to avoid token limits but ensure coverage
    return high_signal_chunks[:15]

def analyze_selective(signal_chunks):
    """
    Sends only the high-signal chunks to Gemini for selective reasoning.
    """
    if not client:
        return {"error": "Gemini client not initialized"}

    # Prepare the context from chunks
    context_blocks = []
    for chunk in signal_chunks:
        context_blocks.append(f"--- START CLUSTER: {chunk['source']} ---\n{chunk['text']}\n--- END CLUSTER ---")
    
    context_text = "\n\n".join(context_blocks)

    prompt = f"""
    You are a professional loan agreement auditor. I have pre-processed a large document and extracted ONLY the high-risk sections (hotspots).
    
    HOTSPOT CONTEXT:
    {context_text}

    TASK:
    Analyze these hotspots and extract:
    1. Core Loan Facts (Interest, Amount, Term, etc. - usually in Page 1 hotspot).
    2. Deep Red Flags (Identify predatory clauses across ALL provided hotspots).
    3. Trust Score (0-100) and Verdict.

    INSTRUCTIONS:
    - Be extremely specific in "text_found". Extract the exact quote.
    - Explain "reasoning" clearly for a non-lawyer.
    - If a fact is not in the hotspots, mark as "Not detected in extract".

    OUTPUT FORMAT (Strict JSON only):
    {{
        "document_metadata": {{ 
            "trust_score": number, 
            "verdict": "Safe" | "Caution" | "Critical",
            "analysis_type": "Selective Chunk-Aware Analysis"
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
                "text_found": "quote from document",
                "reasoning": "human explanation"
            }}
        ],
        "explainability": {{ "confidence": number, "pages_scanned": number }}
    }}
    """

    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt
        )
        
        clean_response = response.text.strip()
        if "```json" in clean_response:
            clean_response = clean_response.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_response:
             clean_response = clean_response.split("```")[1].split("```")[0].strip()
        
        parsed = json.loads(clean_response)
        return parsed
    except Exception as e:
        print(f"Gemini Analysis Error: {e}")
        return {"error": f"AI Generation failed: {str(e)}"}

def process_document(pdf_path):
    """
    New Architecture: Heuristic Scanning + Selective LLM Reasoning.
    """
    start_time = time.time()
    
    # 1. Full document extraction (Page-by-page to keep RAM low)
    pages = extract_text_full_doc(pdf_path)
    if not pages:
        return {"error": "Could not extract text from document."}
    
    # 2. Local Heuristic Scan (Find "hotspots")
    hotspots = heuristic_scanner(pages)
    
    # 3. Targeted Gemini Analysis
    final_analysis = analyze_selective(hotspots)
    
    if "error" not in final_analysis:
        final_analysis["explainability"]["pages_scanned"] = len(pages)
        final_analysis["performance"] = {
            "total_time": round(time.time() - start_time, 2),
            "method": "Selective Heuristic Overlays",
            "chunks_processed": len(hotspots)
        }
    
    return final_analysis
