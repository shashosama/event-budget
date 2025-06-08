#  Event Budget AI

## General Problem

Clubs and student organizations often face challenges with:

- Tracking how much money was spent on previous events
- Deciding how to budget for future events
- Choosing which event types (e.g., workshops, social mixers, conferences) to prioritize
- Making informed financial decisions without having strong budgeting or data skills

These issues can lead to inefficient use of funds, poorly attended events, or budgeting errors.
 something that i have to keep an eye for as an treasurer for my club.

## Solution: 

**Event Budget AI** is a full-stack web application designed to make budgeting smarter and easier. The application:

- Allows users to upload `.csv` or `.xlsx` files containing past spending data
- Analyzes event spending patterns by category, date, and total amount
- Generates smart suggestions for future events and budgets
- Includes a feature to influence AI suggestions with user-provided messages
- Offers a friendly and accessible UI with a sketch-style aesthetic

---

##  Features

- Upload spending data in `.csv` or `.xlsx` format  
-  Automatically calculates average spend  
- Accepts custom user input for context
- Uses AI to generate creative, budget-fitting event ideas  
- Built with Flask backend + React (Vite) frontend  
- CORS-enabled for frontend-backend communication  
- Easily deployable to Render (backend) and Firebase or Vercel (frontend)

---

##  How It Works

1. User uploads a CSV/XLSX file with a column named `Amount`
2. Optionally includes a message (e.g., “for a farewell party”)
3. Backend parses the file, calculates the average spend
4. A prompt is sent to the AI model to suggest a creative event
5. Response includes an event name, short description, and sample budget breakdown

---

## Tech Stack

| Layer     | Tech             |
|-----------|------------------|
| Frontend  | React + Vite + TypeScript |
| Backend   | Python + Flask + Pandas   |
| AI Model  | OpenRouter (Mistral-7B) or OpenAI GPT-3.5/GPT-4 |
| Hosting   | Render (backend), Firebase or Vercel (frontend) |

---

##  Getting Started

# 1. Clone the Repository
```bash
git clone https://github.com/your-username/event-budget-ai.git
cd event-budget-ai
```
# 2 . Banckend setup 
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
```
# .env
OPENROUTER_API_KEY=your_api_key_here


```
# 3 . Start the backend server
```
flask run

```
# 4. Frontend Setup
```
cd frontend
npm install
npm run dev

```
## Sample API
```
import requests

files = {'file': open('example.csv', 'rb')}
data = {'message': 'for a summer picnic'}

response = requests.post("http://localhost:5000/upload", files=files, data=data)
print(response.json())

```
## What I Learned

This project helped me grow in several key areas:

- Built and connected a React frontend with a Flask backend
- Handled file uploads, CORS, and async API communication
- Loaded and cleaned CSV/XLSX files
- Extracted spending patterns and generated recommendations
- Created an AI pipeline that transforms spending data into event suggestions
- Enabled message-based input to influence AI outputs
- Deployed a working product backend on Render
- Considered real use cases (e.g., student treasurers)
- Made budgeting feel intuitive and non-technical for users
### Upload Format
Your uploaded file must include a column labeled exactly Amount.
