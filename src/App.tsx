import { useState, useRef } from 'react';
import './App.css';

type ApiResponse = {
  message?: string;
  suggestion?: {
    event: string;
    budget: number;
    note?: string | null;
  };
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

    
    const backendUrl = `http://${window.location.hostname}:5000/upload`;

    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      

      const data = await res.json();
      setResponse(data);
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
            accept=".csv,.xlsx"
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
          <button type="submit" className="chat-submit">submit</button>
        </div>
      </form>

      {response && (
        <div className="response">
          <h2>Response:</h2>
          {response.error ? (
            <p style={{ color: 'red' }}>{response.error}</p>
          ) : (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
