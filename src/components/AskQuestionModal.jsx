/** AskQuestionModal Component */
import React, { useState } from "react";
const AskQuestionModal = ({ onClose, onSubmit }) => {
    const [name, setName] = useState(""); //name
    const [title, setTitle] = useState(""); //title
    const [question, setQuestion] = useState(""); //question
    const [submitting, setSubmitting] = useState(false);
  
    // Compute validity: both name and question must be non-empty
    const isFormValid = name.trim() !== "" && title.trim() !== "" && question.trim() !== "";
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isFormValid) return;
      setSubmitting(true);
      try {
        // Await onSubmit in case it returns a Promise
        await onSubmit({ user: name, title, question });
      } catch (error) {
        console.error("Error during submission:", error);
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
          <h2 className="text-2xl text-black font-bold mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-black text-sm font-medium">
                Your Name
              </label>
              <input
                placeholder="John Doe"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded text-black"
                required
              />
            </div>
  
            {/* title */}
            <div>
              <label className="block text-black text-sm font-medium">
                Title
              </label>
              <input
                placeholder="A nice title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded text-black"
                required
              />
            </div>
  
            {/* Question */}
            <div>
              <label className="block text-black text-sm font-medium">
                Question
              </label>
              <textarea
                placeholder="Ask a question that is bothering you"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border p-2 rounded text-black"
                rows="4"
                required
              />
            </div>
            {/* <div>
              <p className="text-gray-700">Terms and policy</p>
            </div> */}
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition ${
                !isFormValid || submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AskQuestionModal;