from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello from Flask Backend!"})

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], port=app.config['PORT'])
