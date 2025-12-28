from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config
import os
import uuid
import functools

app = Flask(__name__)
app.config.from_object(Config)

# Configure CORS more strictly
allowed_origin = app.config.get('ALLOWED_ORIGIN', '*')
CORS(app, resources={r"/*": {"origins": allowed_origin}})

# Ensure upload directory exists
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), app.config['UPLOAD_FOLDER'])
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

def require_api_key(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        if app.config.get('API_KEY') and request.headers.get('X-API-Key') != app.config.get('API_KEY'):
            return jsonify({"error": "Unauthorized: Invalid or missing API Key"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "OpticLoan Backend",
        "security": "Active"
    }), 200

@app.route('/upload', methods=['POST'])
@require_api_key
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected for upload"}), 400
    
    if file and file.filename.lower().endswith('.pdf'):
        # Use UUID to prevent filename guessing and overwriting
        original_filename = secure_filename(file.filename)
        filename = f"{uuid.uuid4()}_{original_filename}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(save_path)
            # Log successful upload (internal only)
            app.logger.info(f"File saved successfully: {filename}")
            
            return jsonify({
                "message": "File successfully uploaded and queued for analysis",
                "status": "success"
            }), 200
        except Exception as e:
            app.logger.error(f"Error saving file: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
        return jsonify({"error": "Invalid file type. Only PDF documents are authorized."}), 400

from services.ml_service import process_document

@app.route('/api/analyze', methods=['POST'])
@require_api_key
def analyze_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.lower().endswith('.pdf'):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        try:
            file.save(save_path)
            
            # Run the ML pipeline
            result = process_document(save_path)
            
            # Helper to delete file after processing? For now keep it.
            
            return jsonify({
                "status": "success",
                "filename": filename,
                "analysis": result
            }), 200
            
        except Exception as e:
            app.logger.error(f"Analysis failed: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    port = int(app.config.get('PORT', 5000))
    debug = app.config.get('DEBUG', False)
    app.run(host='0.0.0.0', debug=debug, port=port)
