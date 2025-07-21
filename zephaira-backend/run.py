from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["GET"])
def test():
    return {"message": "ZephAIRa backend works!"}

if __name__ == "__main__":
    app.run(debug=True)
