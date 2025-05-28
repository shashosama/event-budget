// src/App.tsx
import { useState, useRef } from 'react';
import './App.css';

type ApiResponse = {
  message?: string;
  suggestion?: string; // Since OpenAI returns formatted text
  budget?: number;
  error?: string;
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);

    // Works for both local and deployed use cases
    const backendUrl = `http://${window.location.hostname}:5000/upload`;

    try {
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      const text = await res.text();
      try {
        const data: ApiResponse = JSON.parse(text);
        setResponse(data);
      } catch (jsonErr) {
        console.error("JSON Parse Error:", jsonErr);
        console.error("Raw response:", text);
        setResponse({ error: "Invalid response from server." });
      }

    } catch (err) {
      console.error("Upload error:", err);
      setResponse({ error: "Failed to connect to the backend." });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Event Budget AI</h1>

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="upload-wrapper">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="upload-button">
            +
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file && <span className="file-name">{file.name}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="chat-submit">Submit</button>
        </div>
      </form>

      {response && (
        <div className="response">
          <h2>Response:</h2>
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
