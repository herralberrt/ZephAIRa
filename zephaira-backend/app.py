from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import json
import random

app = Flask(__name__)
CORS(app)  # permite cereri din frontend (React)

# Emoții simulate (poți înlocui ulterior cu AI real)
def detect_emotion(text):
    emotions = ['Joy', 'Sadness', 'Anger', 'Surprise', 'Fear', 'Love']
    emojis = ['😊', '😢', '😠', '😲', '😱', '❤️']
    index = random.randint(0, len(emotions) - 1)
    return emotions[index], emojis[index]

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print("Received:", data)

    # Adaugă timestamp
    data["timestamp"] = datetime.now().isoformat()

    # Detectează emoția și emoji-ul
    emotion, emoji = detect_emotion(data["text"])
    data["emotion"] = emotion
    data["emoji"] = emoji

    # Încarcă și actualizează istoricul
    history_path = os.path.join("instance", "history.json")
    os.makedirs("instance", exist_ok=True)
    history = []

    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            history = json.load(f)

    history.append(data)

    with open(history_path, "w") as f:
        json.dump(history, f, indent=2)

    return jsonify(data)

@app.route('/history', methods=['GET'])
def get_history():
    history_path = os.path.join("instance", "history.json")
    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            return jsonify(json.load(f))
    return jsonify([])

@app.route('/clear', methods=['POST'])
def clear_history():
    history_path = os.path.join("instance", "history.json")
    os.makedirs("instance", exist_ok=True)
    with open(history_path, "w") as f:
        json.dump([], f)
    return jsonify({"status": "cleared"})

# rulează serverul Flask
if __name__ == '__main__':
    app.run(debug=True)
