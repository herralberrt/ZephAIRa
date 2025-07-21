from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)  # permite cereri din frontend (React)

# POST /submit – primește date din frontend și le salvează
@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print("Received:", data)

    history_path = os.path.join("instance", "history.json")
    history = []

    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            history = json.load(f)

    history.append(data)

    with open(history_path, "w") as f:
        json.dump(history, f, indent=2)

    return jsonify({"status": "success"})

# GET /history – trimite istoricul complet către frontend
@app.route('/history', methods=['GET'])
def get_history():
    history_path = os.path.join("instance", "history.json")
    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            return jsonify(json.load(f))
    return jsonify([])

# rulează serverul Flask
if __name__ == '__main__':
    app.run(debug=True)
