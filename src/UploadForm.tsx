// src/UploadForm.tsx
import React, { useRef, useState } from "react";

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);

    try {
      const backendUrl = "http://127.0.0.1:5000/upload";
      const res = await fetch(backendUrl, {

        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Upload error:", err);
      setResponse({ error: "Failed to upload" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0] flex items-center justify-center p-6 font-[\'Times New Roman\']">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-xl space-y-6"
      >
        {/* File Upload Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-purple-700 text-white text-xl flex items-center justify-center hover:bg-purple-800 transition"
          >
            +
          </button>
          <input
            type="file"
            accept=".csv,.xlsx"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file && <span className="text-sm text-gray-700">{file.name}</span>}
        </div>

        {/* Message Input + Submit */}
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-4 py-2 border border-purple-600 rounded-l-full bg-[#FFFEF0] text-sm"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-2 rounded-r-full hover:bg-purple-800 transition font-semibold"
          >
            Submit
          </button>
        </div>

        {/* Response Output */}
        {response && (
          <div className="bg-gray-100 p-4 rounded-md text-sm text-left">
            <h4 className="font-semibold mb-1">Response:</h4>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadForm;
