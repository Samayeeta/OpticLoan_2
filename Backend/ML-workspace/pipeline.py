import sys
import os
import json
import logging
from dotenv import load_dotenv

# Add current directory to path so imports work if run from root or subdir
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ocr_engine import extract_text_from_pdf
from analyzers import LoanAnalyzer

# Load environment variables
# Load environment variables explicitly from current directory
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
print(f"DEBUG: Looking for .env at: {env_path}")
print(f"DEBUG: File exists? {os.path.exists(env_path)}")
load_dotenv(env_path)
api_key = os.getenv("GOOGLE_API_KEY")
print(f"DEBUG: GOOGLE_API_KEY loaded? {'Yes' if api_key else 'No'}")
if api_key:
    print(f"DEBUG: First 4 chars of key: {api_key[:4]}...")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def process_loan_document(pdf_path: str, api_key: str = None) -> str:
    """
    Runs the full OpticLoan IDP pipeline:
    1. Digitization (OCR)
    2. Analysis (Gemini + Pydantic)
    3. JSON Output
    """
    logger.info(f"Processing document: {pdf_path}")

    # Stage 1: Digitization
    try:
        raw_text = extract_text_from_pdf(pdf_path)
        logger.info(f"Text extraction complete. Length: {len(raw_text)} chars")
    except Exception as e:
        logger.error(f"OCR failed: {e}")
        return json.dumps({"error": "OCR Digitization failed", "details": str(e)}, indent=2)

    # Stage 2 & 3: Extraction & Risk Audit
    try:
        analyzer = LoanAnalyzer(api_key=api_key)
        filename = os.path.basename(pdf_path)
        analysis_result = analyzer.analyze_document(raw_text, filename)
        
        # Convert Pydantic model to dict/JSON
        # .model_dump() is for Pydantic v2, .dict() for v1. 
        # using json.loads(analysis_result.model_dump_json()) to ensure serialization
        # But wait, analyze_document returns a dict from json.loads(response.text)
        # So it is already a dict.
        
        logger.info("Analysis complete.")
        return json.dumps(analysis_result, indent=2)

    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        return json.dumps({"error": "AI Analysis failed", "details": str(e)}, indent=2)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pipeline.py <path_to_pdf> [api_key]")
        sys.exit(1)

    pdf_file = sys.argv[1]
    
    # Optional: pass API key as second arg, or rely on env var
    key = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not os.path.exists(pdf_file):
        print(f"Error: File not found: {pdf_file}")
        sys.exit(1)

    result = process_loan_document(pdf_file, key)
    print("--- FINAL OUTPUT JSON ---")
    print(result)
