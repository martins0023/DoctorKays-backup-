/** AskQuestionModal Component */
import React, { useState } from "react";
import Modal from "../Modal";
const EnguiryModal = ({ onClose, onSubmit }) => {
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const [fullname, setFullname] = useState(""); //name
  const [email, setEmail] = useState(""); //name
  const [enquiry, setEnquiry] = useState(""); //question
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute validity: both name and question must be non-empty
  const isFormValid =
    fullname.trim() !== "" && email.trim() !== "" && enquiry.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      // Await onSubmit in case it returns a Promise
      await onSubmit({ fullname, email, enquiry });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed p-3 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl text-black font-bold mb-4">Make Enquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-black text-sm font-medium">
              Your Name
            </label>
            <input
              placeholder="John Doe"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-black text-sm font-medium">
              Your Email
            </label>
            <input
              placeholder="JohnDoe@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-black text-sm font-medium">
              Your Enquiry
            </label>
            <textarea
              placeholder="Make enquiries about this product"
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
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
            className={`bg-black text-white py-2 px-4 rounded hover:opacity-90 transition ${
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

export default EnguiryModal;
