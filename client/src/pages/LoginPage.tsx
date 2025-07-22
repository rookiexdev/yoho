import { useState } from "react";
import { configs } from "../configs";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAuth = () => {
    const baseUrl = configs.backendUrl;
    const url = `${baseUrl}/auth/zoho?name=${name}&email=${email}`;
    window.location.href = url;
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto my-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Zoho Sign In</h2>
        <input
          className="w-full px-3 py-2 border rounded-md mb-3"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border rounded-md mb-3"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          onClick={handleAuth}
          disabled={!name || !email}
        >
          Authenticate with Zoho
        </button>
      </div>
    </div>
  );
};
