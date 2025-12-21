import os

class Config:
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("DEBUG", "True").lower() == "true"
    # API_KEY = os.environ.get("API_KEY")
