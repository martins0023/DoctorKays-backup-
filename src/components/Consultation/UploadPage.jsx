// File: Consultation/UploadPage.jsx
import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  UploadCloud,
  Trash2,
  CheckCircle,
  AlertCircle,
  Send,
  XCircle,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TermsPolicy from "../TermsPolicy";
import ConsultForm from "./components/ConsultForm";

const API_BASE =
  "https://doctorkays-backend-1.onrender.com" || "http://localhost:5000";

export default function UploadPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ← loading flag
  const [files, setFiles] = useState([]); // { file, status: "ready"|"error"|"uploaded" }
  const dropRef = useRef();
  const mode = params.get("mode"); // "ai" or "human"

  const onFilesAdded = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles).map((file) => ({
      file,
      status: file.size > 25 * 1024 * 1024 ? "error" : "ready",
    }));
    setFiles((prev) => [...prev, ...fileArray]);
  }, []);

  // drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("ring-2", "ring-purple-500");
  };
  const handleDragLeave = () => {
    dropRef.current.classList.remove("ring-2", "ring-purple-500");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("ring-2", "ring-purple-500");
    onFilesAdded(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    onFilesAdded(e.target.files);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Feedback
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  const handleSend = async () => {
    setLoading(true);
    const formData = new FormData();

    // map fields
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);
    formData.append("story", formValues.description);
    formData.append("consultationType", mode);

    // append files
    // files.forEach(({ file }, idx) => {
    //   formData.append("reportFile", file);
    // });

    const firstFile = files.find((f) => f.status === "ready");
    if (firstFile) {
      console.log("Appending file to FormData:", firstFile.file.name);
      formData.append("reportFile", firstFile.file);
    } else {
      console.warn("No ready file found to append");
    }

    //    if (formValues.reportFile) {
    //     formData.append("reportFile", formValues.reportFile);
    //   }

    try {
      const { data } = await axios.post(`${API_BASE}/api/free-subscription`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToast({
        type: "success",
        message: "Your consultation request has been saved!",
      });
      // Optionally clear form:
      setFiles([]);
      setFormValues({ name: "", email: "", phone: "", description: "" });

      // If AI mode, jump to analysis page, passing the new record’s ID
      if (mode === "ai" && data.consultation?._id) {
        navigate(`/ai-analysis/${data.consultation._id}`);
      }

    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Validation for Send button
  const canSend =
    files.length > 0 &&
    !files.some((f) => f.status === "error") &&
    formValues.name.trim() &&
    formValues.email.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <main className="p-6 lg:p-12 font-sans max-w-3xl mx-auto space-y-6">
        <div className="">
          <h1 className="text-2xl font-semibold mb-4 pt-10">
            {mode === "ai" ? "AI Analysis" : "Doctor Review"} &mdash; Upload
            Report
          </h1>
          <p className="mb-6 text-gray-300">
            Please choose your report file (PDF, DOC, or image). Once uploaded,
            we’ll{" "}
            {mode === "ai"
              ? "run it through our AI analysis"
              : "forward it to a specialist for review and get back to you through your email"}
            .
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
          {/* Drag & Drop Area */}
          <div
            ref={dropRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="relative border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-purple-400 transition"
            onClick={handleBrowse}
          >
            <UploadCloud className="w-10 h-10 mb-2" />
            <p className="text-center text-md">
              Drag &amp; drop file(s) here
              <br />
              <button
                type="button"
                onClick={handleBrowse}
                className="underline font-medium mt-1"
              >
                or browse
              </button>
            </p>
            <input
              id="fileInput"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* File Preview List */}
          <ul className="space-y-4">
            {files.map(({ file, status }, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-800 text-sm font-medium">
                    {file.name}
                  </span>
                  {status === "ready" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                  <button onClick={() => removeFile(idx)}>
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Contact Form */}
          <ConsultForm values={formValues} onChange={handleFormChange} />

          {/* Back + Send */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-purple-400 hover:underline"
            >
              ← Back
            </button>
            <button
              onClick={handleSend}
              disabled={!canSend || loading}
              className={`inline-flex items-center px-6 py-2 rounded-full font-semibold transition
              ${
                canSend && !loading
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-purple-600/50 text-white/70 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin w-5 h-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
        {/* Toast */}
        {toast && (
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <p>{toast.message}</p>
            <button onClick={() => setToast(null)}>
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
      <TermsPolicy />
    </div>
  );
}
