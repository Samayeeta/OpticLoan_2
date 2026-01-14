import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("DEBUG", "False").lower() == "true"
    API_KEY = os.environ.get("API_KEY")
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "uploads")
    ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
