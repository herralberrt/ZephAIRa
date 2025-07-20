from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(300), nullable=False)
    options = db.Column(db.PickleType, nullable=False)  # list of options

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "options": self.options
        }
