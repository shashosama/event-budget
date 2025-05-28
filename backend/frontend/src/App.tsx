// src/App.tsx
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Upload a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);

    const backendUrl = "https://event-budget-backend.onrender.com/upload";

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Fetch error", err);
      setResponse({ error: "Failed to connect to backend" });
    }
  };

  return (
    <div>
      <h1>Event Budget AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          {response.error ? (
            <p style={{ color: 'red' }}>{response.error}</p>
          ) : (
            <pre>{response.suggestion}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
