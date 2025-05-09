// File: Consultation/PhotoPage.jsx
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Send, XCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TermsPolicy from "../TermsPolicy";
import ConsultForm from "./components/ConsultForm";

const API_BASE =
  "https://doctorkays-backend-1.onrender.com" || "http://localhost:5000";

export default function PhotoPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const mode = params.get("mode"); // "ai" or "human"

  // video / canvas refs
  const videoRef = useRef();
  const canvasRef = useRef();

  // captured blob
  const [photoBlob, setPhotoBlob] = useState(null);

  // form fields
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const handleFormChange = (field, value) =>
    setFormValues((p) => ({ ...p, [field]: value }));

  // toast + loading
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // start camera on mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (e) {
        console.error("Camera access error:", e);
        setToast({
          type: "error",
          message: "Cannot access camera. Please allow permissions.",
        });
      }
    };
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // capture into blob
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          console.log("Captured blob:", blob);
          setPhotoBlob(blob);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  // send to free-subscription
  const handleSend = async () => {
    setLoading(true);
    const body = new FormData();

    // text fields
    body.append("name", formValues.name);
    body.append("email", formValues.email);
    body.append("consultationType", mode);
    body.append("story", formValues.description);

    // file field
    if (photoBlob) {
      console.log("Appending photoBlob:", photoBlob);
      body.append("reportFile", photoBlob, "capture.jpg");
    }

    // debug formData contents
    for (let [key, val] of body.entries()) {
      console.log("FormData:", key, val);
    }

    try {
      const { data } = await axios.post(`${API_BASE}/api/free-subscription`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToast({
        type: "success",
        message: "Your subscription request has been saved!",
      });
      // reset
      setPhotoBlob(null);
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

  // only enable send when form & photoReady
  const canSend =
    !!photoBlob &&
    formValues.name.trim() &&
    formValues.email.trim() &&
    !loading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <main className="p-6 lg:p-12 pt-10 font-sans max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold mb-4">
          {mode === "ai" ? "AI Analysis" : "Doctor Review"} &mdash; Take a Photo
        </h1>
        <p className="mb-6 text-gray-300">
          Allow camera access, then snap a clear image of your report. We’ll{" "}
          {mode === "ai"
            ? "analyze it automatically"
            : "send it to our specialists and get back to you via email"}
          .
        </p>

        <div className="bg-white rounded-xl p-4 shadow-lg max-w-3xl mx-auto">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-lg mb-4"
          />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={capturePhoto}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Capture Photo
          </button>

          {photoBlob && (
            <img
              src={URL.createObjectURL(photoBlob)}
              alt="Preview"
              className="
     mt-4
     mx-auto
     max-w-xs      
     h-48          
    object-contain
     rounded-xl
     shadow-md
     border
     border-gray-200"
            />
          )}

          {/* contact form */}
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
              disabled={!canSend}
              className={`inline-flex items-center px-6 py-2 rounded-full font-semibold transition ${
                canSend
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
