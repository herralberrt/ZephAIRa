from flask import Blueprint, jsonify, request
from .models import db, QuizQuestion

main = Blueprint("main", __name__)

@main.route("/quiz", methods=["GET"])
def get_quiz():
    questions = QuizQuestion.query.all()
    return jsonify([q.to_dict() for q in questions])

@main.route("/quiz", methods=["POST"])
def submit_quiz():
    data = request.get_json()
    print("Received answers:", data)
    return jsonify({"message": "Answers received!"})
