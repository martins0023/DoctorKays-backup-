// File: components/FullScreenError.jsx
import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FullScreenError({ message = "Something went wrong." }) {
  const navigate = useNavigate

  const handleHome = () => {
    navigate("/")
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 font-sans">
      <XCircle className="w-16 h-16 text-red-600 mb-4 animate-bounce" aria-hidden="true" />
      <p className="text-xl text-red-700 font-medium text-center">{message}</p>
      <div className="gap-2 flex">
        <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Retry
      </button>

      <button
        onClick={handleHome}
        className="mt-6 inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-red-700 transition"
      >
        Home
      </button>
      </div>
      
    </div>
  );
}
