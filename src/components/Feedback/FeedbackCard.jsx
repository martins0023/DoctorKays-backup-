// src/components/FeedbackCard.jsx
import React, { useState } from "react";
import { gradient } from "../../assets";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import axios from "axios";

export default function FeedbackCard() {
  const [step, setStep] = useState("buttons");      // "buttons" | "form" | "thanks"
  const [feedbackType, setFeedbackType] = useState(null); // "yes" | "no"
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openForm = (type) => {
    setFeedbackType(type);
    setStep("form");
  };

  const apiUrl =
        "https://doctorkays-backend-1.onrender.com" || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${apiUrl}/api/feedback/post`, { name, comments });
      setStep("thanks");
    } catch (err) {
      console.error(err);
      alert("Failed to submit—please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full mx-auto rounded-2xl overflow-hidden">
      {/* Gradient background: height expands if form is open */}
      <div className={`w-full ${step === "form" ? "min-h-[80vh]" : "h-96"}`}>
        <img src={gradient} alt="gradient" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-900 bg-opacity-50" />
      </div>

      {/* Centered overlay; allow vertical scroll when form is tall */}
      <div className="absolute inset-0 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg text-white">
          <h3 className="text-2xl md:text-3xl font-semibold text-left sm:text-center mb-4">
            Did you find what you were looking for today?
          </h3>
          <p className="text-left sm:text-center mb-6">
            Let us know so we can improve the quality of the content on our pages.
          </p>

          {step === "buttons" && (
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => openForm("yes")}
                className="flex-1 w-full px-6 py-4 bg-white text-black font-medium rounded-full
                           shadow-lg hover:shadow-2xl transition animate-pulse hover:animate-none flex items-center justify-center gap-2"
              >
                Yes <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => openForm("no")}
                className="flex-1 w-full px-6 py-4 bg-white text-black font-medium rounded-full
                           shadow-lg hover:shadow-2xl transition animate-pulse hover:animate-none flex items-center justify-center gap-2"
              >
                No <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === "form" && (
            <form
              onSubmit={handleSubmit}
              className="mt-4 bg-white bg-opacity-90 text-black rounded-xl p-6 mx-auto
                         w-full max-w-md overflow-y-auto max-h-[70vh] relative"
            >
              <button
                type="button"
                onClick={() => setStep("buttons")}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h4 className="text-lg font-semibold mb-4 text-center">
                {feedbackType === "yes"
                  ? "Great! What did you like?"
                  : "Sorry! How can we improve?"}
              </h4>
              <label className="block mb-3">
                <span className="text-sm font-medium">Your Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-1 rounded-md border-gray-300 h-10"
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm font-medium">
                  Additional Feedback (optional)
                </span>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-1"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-700 text-white py-3 rounded-md
                           hover:bg-purple-800 transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}

          {step === "thanks" && (
            <div className="mt-4 bg-white bg-opacity-90 text-black rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold mb-2">Thank you!</h4>
              <p>Your feedback helps us improve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
