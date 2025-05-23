from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    message = request.form.get("message", "")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        df = pd.read_csv(file)
        avg_spend = df["Amount"].mean() if "Amount" in df.columns else 0
        suggestion = {
            "event": "Team Lunch",
            "budget": round(avg_spend, 2),
            "note": f"Based on your message: '{message}'" if message else None
        }
        return jsonify({"message": "Success", "suggestion": suggestion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Server started")
    app.run(host="0.0.0.0", port=5000, debug=True)
