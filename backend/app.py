from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import time
import os

# ✅ FIX PATH
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/status", methods=["POST"])
def check_status():
    data = request.get_json()
    url = data.get("url")

    try:
        start = time.time()
        response = requests.get(url, timeout=5)
        end = time.time()

        status = "UP" if response.status_code == 200 else "DOWN"

        return jsonify({
            "status": status,
            "response_time": round(end - start, 2)
        })
    except:
        return jsonify({
            "status": "DOWN",
            "response_time": 0
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)