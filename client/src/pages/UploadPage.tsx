import React, { useState } from "react";

import { configs } from "../configs";

export function UploadDocument() {
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const baseUrl = configs.backendUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }
    if (!name || !email || !title) {
      setStatus("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("name", name);

    try {
      const res = await fetch(`${baseUrl}/documents/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Document uploaded successfully!");
        console.log("successfully upload file => ", data);
      } else {
        setStatus(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Document</h2>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md mb-3"
        placeholder="Recipient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="w-full px-3 py-2 border rounded-md mb-3"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition cursor-pointer"
      >
        Upload
      </button>
      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
}
