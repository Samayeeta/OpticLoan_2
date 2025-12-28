import os
import google.generativeai as genai
from pydantic import BaseModel, Field
from typing import List, Optional
import json
from datetime import datetime

# Pydantic Models for Structured Output
class LoanFacts(BaseModel):
    borrower_name: Optional[str] = Field(None, description="Name of the borrower")
    loan_amount: Optional[float] = Field(None, description="Total principal amount of the loan")
    currency: str = Field("USD", description="Currency of the loan")
    interest_rate_apr: Optional[float] = Field(None, description="Annual Percentage Rate (APR)")
    term_months: Optional[int] = Field(None, description="Loan term in months")
    maturity_date: Optional[str] = Field(None, description="Final payment date (YYYY-MM-DD)")

class RiskFlag(BaseModel):
    severity: str = Field(..., description="Risk severity level: High, Medium, or Low")
    category: str = Field(..., description="Category of the risk (e.g., Prepayment Penalty, Variable Rate)")
    text_found: str = Field(..., description="The exact text snippet from the document that triggered the flag")
    page_number: Optional[int] = Field(None, description="Page number where the text was found")
    reasoning: str = Field(..., description="Explanation of why this is a risk")

class ExplainabilityData(BaseModel):
    model_confidence: float = Field(..., description="Confidence score of the analysis (0.0 to 1.0)")
    clauses_analyzed: Optional[int] = Field(None, description="Approximate number of clauses processed")
    legal_precedents_referenced: List[str] = Field(default_factory=list, description="Relevant legal precedents or acts")

class DocumentMetadata(BaseModel):
    filename: str
    analysis_timestamp:str
    overall_trust_score: int = Field(..., description="Files trust score from 0-100")
    verdict: str = Field(..., description="Overall verdict: Safe, Caution, or High Risk")

class AnalysisResult(BaseModel):
    document_metadata: DocumentMetadata
    facts: LoanFacts
    red_flags: List[RiskFlag]
    explainability_data: ExplainabilityData

class LoanAnalyzer:
    def __init__(self, api_key: str = None):
        """
        Initialize the LoanAnalyzer with the Gemini API key.
        """
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("Google API Key is required. Set GOOGLE_API_KEY env var or pass it to constructor.")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    def analyze_document(self, document_text: str, filename: str) -> AnalysisResult:
        """
        Analyzes the loan document text to extract facts and identify risks.
        """
        
        prompt = f"""
        You are an expert legal auditor and AI loan analyst. Your job is to strictly analyze the provided loan agreement text.
        
        **Task:**
        1.  **Extract Facts**: Identify key financial details like Principal, APR, Term, etc.
        2.  **Audit for Risks**: Search for "Red Flags" and "Trap Clauses" that prey on borrowers.
            -   **Prepayment Penalties**: Fees for early payoff.
            -   **Variable Rate Spikes**: Unexpected interest rate increases.
            -   **Missing Clauses**: key protections like "Grace Periods".
            -   **Discrepancy Check**: Inconsistent numbers across pages.
            -   **Draconian Default**: Aggressive default terms.
        
        **Document Text:**
        {document_text}
        
        **Output Format:**
        Return the result strictly as a valid JSON matching the following schema.
        Note:
        - `overall_trust_score` should be an integer 0-100 (100 is safest).
        - `verdict` should be "Safe", "Caution", or "High Risk".
        - `page_number` in red_flags should be inferred from the "--- Page X ---" markers if present.
        """
        
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    response_schema=AnalysisResult
                )
            )
            
            # The response.text should be a JSON string matching AnalysisResult
            result_json = json.loads(response.text)
            
            # Post-processing to ensure metadata matches exact request if needed (e.g., timestamp)
            result_json['document_metadata']['filename'] = filename
            result_json['document_metadata']['analysis_timestamp'] = datetime.now().isoformat()

            return result_json
            
        except Exception as e:
            # Fallback or error handling
            print(f"Error during analysis: {e}")
            # Return a dummy error structure or re-raise
            raise
