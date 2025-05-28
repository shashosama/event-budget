from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print("Loaded API Key:", openai.api_key)  # Should not be None

app = Flask(__name__)
CORS(app)
@app.route("/", methods=["GET"])
def home():
    return {"message": "Event Budget AI Backend is live!"}

@app.route("/upload", methods=["POST"])
def upload_file():
    print("/upload was hit")
    file = request.files.get("file")
    message = request.form.get("message", "")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        df = pd.read_csv(file)
        avg_spend = df["Amount"].mean() if "Amount" in df.columns else 0

        prompt = (
            f"You are an AI event planner. A user uploaded past expense data. "
            f"The average spend is ${avg_spend:.2f}. The user says: '{message}'. "
            f"Suggest a creative event idea that fits this budget. Include the event name, a short description, and a basic cost breakdown."
        )

        # ✅ Updated OpenAI API usage
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )

        return jsonify({
            "message": "Success",
            "suggestion": response.choices[0].message.content.strip(),
            "budget": round(avg_spend, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

