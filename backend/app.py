from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

# Default APIs
APIS = [
    "https://api.github.com",
    "https://google.com"
]

@app.route("/status")
def status():
    result = []

    for api in APIS:
        start = time.time()

        try:
            r = requests.get(api, timeout=3)
            status = "UP" if r.status_code == 200 else "DOWN"
        except:
            status = "DOWN"

        response_time = round((time.time() - start) * 1000, 2)

        result.append({
            "api": api,
            "status": status,
            "response_time": response_time
        })

    return jsonify(result)


# 🔥 NEW: Add custom API
@app.route("/add", methods=["POST"])
def add_api():
    data = request.json
    url = data.get("url")

    if url:
        APIS.append(url)
        return jsonify({"message": "API added!"})

    return jsonify({"error": "No URL provided"}), 400


if __name__ == "__main__":
    app.run(debug=True)