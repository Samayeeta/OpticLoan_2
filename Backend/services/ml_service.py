import os
import pytesseract
from pdf2image import convert_from_path
import json
import time
from transformers import pipeline

# Initialize local pipeline
# Using distilbert-base-uncased-distilled-squad for QA
print("Initializing DistilBERT QA pipeline...")
try:
    qa_pipeline = pipeline(
        "question-answering", 
        model="distilbert-base-uncased-distilled-squad",
        device=-1 # Use CPU for now, change to 0 if GPU available
    )
except Exception as e:
    print(f"Error initializing QA pipeline: {e}")
    qa_pipeline = None

def extract_text_tesseract(pdf_path, max_pages=None):
    """
    Convert PDF to images and extract text using Tesseract OCR.
    """
    try:
        images = convert_from_path(pdf_path)
        
        # Limit pages only if specified
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

# REASONING MODULE: Maps categories to human-friendly explanations
REASONING_TEMPLATES = {
    "Fees": "Additional charges found outside the principal interest. These can significantly increase the effective annual percentage rate (APR) of your loan.",
    "Prepayment": "A fee charged if you pay off the loan earlier than scheduled. This limits your ability to refinance if interest rates drop in the future.",
    "Default": "This clause defines what constitutes a failure to meet the agreement. Predatory terms often define default too broadly, allowing the lender to seize collateral prematurely.",
    "Acceleration": "Allows the lender to demand the entire loan balance immediately. This is a high-risk clause that can lead to sudden insolvency if triggered by minor technicalities.",
    "Collateral": "Specifies which assets the lender can seize if you fail to pay. 'Blanket' liens on all property are generally considered high-risk for borrowers.",
    "Jurisdiction": "The legal location where disputes will be settled. Being forced to litigate in a distant state or through biased arbitration can be very costly.",
    "Legal Waivers": "Forces you to give up your right to a jury trial or other legal protections. This significantly weakens your position in any potential dispute.",
    "Judgment": "A 'Confession of Judgment' allows the lender to bypass the court system to seize assets immediately. This is considered highly predatory.",
    "Asset Seizure": "Clarifies the conditions under which your property can be taken. Clauses that allow seizure without notice or court oversight are critical red flags.",
    "Interest Hike": "A penalty that increases your interest rate significantly after a single late payment, often making the debt unmanageable."
}

def clean_numeric_value(text, field_type):
    """
    Standardize text: Title Case, extract numbers, add units.
    """
    import re
    text = " ".join(text.split()).strip()
    if not text or text.lower() == "not found":
        return "Not detected clearly"
    
    # 1. Extraction for specific types
    if field_type == "currency":
        matches = re.findall(r'\$\s?[\d,.]+(?:\s?million|billion|k|m)?', text, re.IGNORECASE)
        # If we asked for currency and got "percentage per annum", reject it
        if matches: return matches[0].upper()
        return "Not detected clearly"
    
    if field_type == "percentage":
        matches = re.findall(r'[\d.]+\s?%', text)
        if matches: return matches[0]
        return "Not detected clearly"

    if field_type == "months":
        digits = re.findall(r'\d+', text)
        if digits: return f"{digits[0]} Months"

    # 2. General Cleanup: Title Case for readability
    # If it's a long sentence, just capitalize first letter. If short, Title Case.
    if len(text.split()) < 5:
        return text.title()
    else:
        return text[0].upper() + text[1:]

def get_expanded_context(answer, context):
    """
    Finds the sentence containing the answer and returns it for better context.
    """
    start_idx = context.find(answer)
    if start_idx == -1: return answer
    
    # Try to find the start of the sentence
    sent_start = max(0, context.rfind('.', 0, start_idx) + 1)
    # Try to find the end of the sentence
    sent_end = context.find('.', start_idx + len(answer))
    if sent_end == -1: sent_end = len(context)
    else: sent_end += 1
    
    clause = context[sent_start:sent_end].strip()
    return " ".join(clause.split()) # Clean double spaces

def analyze_document_local(text):
    """
    Extract facts and identify risks using local DistilBERT QA model.
    """
    if not qa_pipeline:
        return {"error": "QA pipeline not initialized"}

    # More robust questions for facts
    fact_questions = {
        "Interest Rate": "What is the primary interest rate percentage?",
        "Loan Amount": "What is the total principal amount of the loan in dollars?",
        "Loan Term": "How many months or years is the loan duration?",
        "Late Penalties": "What specific dollar amount is the late payment penalty?",
        "Collateral": "Which specific property or asset is being used as security?",
        "Jurisdiction": "In which city or state is the legal jurisdiction?"
    }
    
    # Expanded risk surface area
    risk_questions = [
        {"category": "Fees", "question": "Are there any hidden service, administrative, or processing fees?", "severity": "Medium"},
        {"category": "Prepayment", "question": "What is the penalty for paying the loan early?", "severity": "Medium"},
        {"category": "Default", "question": "Under what specific conditions can the lender claim a default?", "severity": "High"},
        {"category": "Acceleration", "question": "Can the lender demand immediate full payment of the balance?", "severity": "High"},
        {"category": "Interest Hike", "question": "Does the interest rate increase after a late payment?", "severity": "High"},
        {"category": "Legal Waivers", "question": "Does the borrower waive trial by jury or any legal rights?", "severity": "High"},
        {"category": "Judgment", "question": "Is there a confession of judgment or cognovit clause?", "severity": "High"},
        {"category": "Asset Seizure", "question": "Can the lender seize assets without a court order?", "severity": "High"}
    ]

    extracted_facts = {}
    red_flags = []
    total_confidence = 0
    q_count = 0

    # DistilBERT context window optimization
    chunk_size = 2000 
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    
    # PERFORMANCE OPTIMIZATION: 
    # Facts are usually at the beginning. Limit fact search to first 4 chunks (~8000 chars).
    fact_chunks = chunks[:4]
    
    # To avoid repeating analysis on the same text 100 times:
    # 1. We process facts first on early pages
    # 2. We process risks on all pages, but only if the document isn't massive
    risk_chunks = chunks if len(chunks) < 15 else chunks[:15] # Limit to ~30k chars for safety on CPU

    print(f"Analyzing {len(chunks)} total chunks. (Using {len(fact_chunks)} for facts, {len(risk_chunks)} for risks)")

    # Extract Facts
    for key, question in fact_questions.items():
        best_answer = {"answer": "Not found", "score": 0}
        for chunk in fact_chunks:
            try:
                result = qa_pipeline(question=question, context=chunk)
                if result['score'] > best_answer['score']:
                    best_answer = result
                # Optimization: If very confident, stop looking in other chunks
                if best_answer['score'] > 0.8: break
            except:
                continue
        
        if best_answer['score'] > 0.05:
            val = best_answer['answer']
            field_map = {
                "Interest Rate": "percentage",
                "Loan Amount": "currency",
                "Loan Term": "months",
                "Late Penalties": "currency"
            }
            val = clean_numeric_value(val, field_map.get(key, "text"))
            
            extracted_facts[key] = val
            total_confidence += best_answer['score']
            q_count += 1
        else:
            extracted_facts[key] = "Not detected clearly"

    # Identify Red Flags
    # Map to track unique clauses to avoid duplicate red flags for same sentence
    found_clauses = {}

    for risk in risk_questions:
        best_result = {"answer": "", "score": 0, "context": ""}
        for chunk in risk_chunks:
            try:
                result = qa_pipeline(question=risk['question'], context=chunk)
                if result['score'] > best_result['score']:
                    best_result = result
                    best_result['full_chunk'] = chunk
                if result['score'] > 0.8: break
            except:
                continue
        
        # High bar for local extraction
        if best_result['score'] > 0.12 and len(best_result['answer']) > 3:
            full_clause = get_expanded_context(best_result['answer'], best_result['full_chunk'])
            
            # Simple deduplication (don't add same sentence for multiple questions)
            if full_clause not in found_clauses:
                category = risk['category']
                template_reason = REASONING_TEMPLATES.get(category, "Identified as a critical risk clause.")
                
                red_flags.append({
                    "severity": risk['severity'],
                    "category": category,
                    "text_found": full_clause,
                    "reasoning": template_reason
                })
                found_clauses[full_clause] = True
                total_confidence += best_result['score']
                q_count += 1

    # Synthesize verdict
    trust_score = int((total_confidence / max(q_count, 1)) * 100)
    verdict = "Safe"
    if any(f['severity'] == "High" for f in red_flags):
        verdict = "Critical"
    elif len(red_flags) > 0:
        verdict = "Caution"

    return {
        "document_metadata": { "trust_score": min(trust_score, 100), "verdict": verdict },
        "facts": extracted_facts,
        "red_flags": red_flags,
        "explainability": { "confidence": round(total_confidence / max(q_count, 1), 2) }
    }

def process_document(pdf_path):
    """
    Orchestrate local DistilBERT Pipeline.
    """
    start_time = time.time()
    
    # 1. OCR (Full document)
    raw_text = extract_text_tesseract(pdf_path)
    
    # 2. Local Analysis (QA-based)
    final_analysis = analyze_document_local(raw_text)
    
    final_analysis["performance"] = {
        "total_time": time.time() - start_time,
        "model": "distilbert-base-uncased-distilled-squad",
        "optimized": True
    }
    
    return final_analysis
