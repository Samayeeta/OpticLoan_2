import pdfplumber
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts text from a PDF file using pdfplumber.
    
    Args:
        pdf_path (str): The file path to the PDF document.
        
    Returns:
        str: A single string containing the text of the entire document, 
             with page markers (e.g., '--- Page 1 ---').
    """
    logger.info(f"Starting OCR extraction for: {pdf_path}")
    full_text = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    # Add page marker and text
                    full_text.append(f"--- Page {i + 1} ---")
                    full_text.append(page_text)
                    full_text.append("\n") # Add spacing between pages
                else:
                    logger.warning(f"No text extracted from page {i + 1}")

        combined_text = "\n".join(full_text)
        logger.info("OCR extraction completed successfully.")
        return combined_text

    except Exception as e:
        logger.error(f"Error during OCR extraction: {str(e)}")
        raise
