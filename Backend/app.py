from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Ensure upload directory exists
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "OpticLoan Backend",
        "endpoints": ["/upload"]
    }), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected for upload"}), 400
    
    if file and file.filename.lower().endswith('.pdf'):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(save_path)
            print(f"File saved successfully at: {save_path}")
            return jsonify({
                "message": "File successfully uploaded",
                "filename": filename,
                "status": "success"
            }), 200
        except Exception as e:
            print(f"Error saving file: {str(e)}")
            return jsonify({"error": "Internal server error while saving file"}), 500
    else:
        return jsonify({"error": "Invalid file type. Only PDF documents are authorized."}), 400

if __name__ == '__main__':
    port = int(app.config.get('PORT', 5000))
    debug = app.config.get('DEBUG', True)
    app.run(host='0.0.0.0', debug=debug, port=port)
