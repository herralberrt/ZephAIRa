from app import create_app
from app.models import db, QuizQuestion

app = create_app()
app.app_context().push()

db.create_all()

# Only add questions if DB is empty
if QuizQuestion.query.count() == 0:
    q1 = QuizQuestion(
        question="How are you feeling today?",
        options=["Happy", "Sad", "Calm", "Anxious"]
    )
    q2 = QuizQuestion(
        question="Which color best matches your current mood?",
        options=["Blue", "Red", "Green", "Yellow"]
    )
    db.session.add_all([q1, q2])
    db.session.commit()
    print("Quiz questions seeded.")
else:
    print("Quiz database already populated.")
