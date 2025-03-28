// src/components/SubscriptionForm.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Trash2, PlusCircle, Download } from "lucide-react";
import Modal from "./Modal";

// Define which consultation types require file uploads (adjust these values as needed)
const fileRequiredTypes = [
  "Blood Tests",
  "Scan Reports",
  "Blood Tests and Scan Report",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const SubscriptionForm = ({
  option,
  onClose,
  onProceedToPayment,
  onFreeSubscription,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: option?.title || "",
    price: option?.price || "",
    reportFile: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For drag-and-drop events
  const dropZoneRef = useRef(null);

  // Dynamically check if file upload is required based on consultation type
  const isFileRequired = fileRequiredTypes.includes(formData.consultationType);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function to handle file selection logic
  const handleFileSelect = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert("File exceeds maximum size of 10 MB");
      return;
    }
    setFormData((prev) => ({ ...prev, reportFile: file }));
  };

  // Handle file input for required consultations
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, reportFile: e.target.files[0] });
    }
  };

  // Drag events
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Remove file
  const removeFile = () => {
    setFormData((prev) => ({ ...prev, reportFile: null }));
  };

  // (Demo) Download action
  const handleDownload = () => {
    if (!formData.reportFile) return;
    alert(`Downloading: ${formData.reportFile.name}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl =
        "https://doctorkays-backend-1.onrender.com" || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Saved consultation:", result);

      // Remove any non-numeric characters and parse the price
      const numericPrice = parseFloat(formData.price.replace(/[^0-9.]/g, ""));
      if (numericPrice === 0) {
        onFreeSubscription(formData);
        setModalMessage(
          "Thank you for your message. We have received your request and sent a confirmation email."
        );
        setIsModalOpen(true);
      } else {
        // Otherwise, proceed to payment workflow
        onProceedToPayment(formData);
      }
    } catch (error) {
      console.error("Error saving consultation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Form is valid if name and email are filled, terms are accepted,
  // and, if file upload is required, a file is provided.
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    (!isFileRequired || formData.reportFile) &&
    agreed;

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-black overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Subscribe to {option?.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            placeholder="John Doe"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            placeholder="myemail@email.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* phone */}
        <div>
          <label className="block text-sm font-medium">Phone <span className="text-gray-600">(optional)</span></label>
          <input
            placeholder="+234 "
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>

        {/* Consultation Type (read-only) */}
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium">Consultation Type</label>
          <input
            type="text"
            name="consultationType"
            value={formData.consultationType}
            readOnly
            className="mt-1 w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Price (read-only) */}
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            readOnly
            className="mt-1 w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Drag & Drop File Section (only if file is required) */}
        {isFileRequired && (
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium">
              Upload Report (PDF/DOC)
            </label>

            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center
                         cursor-pointer hover:border-gray-400 transition-colors"
            >
              {!formData.reportFile && (
                <>
                  <PlusCircle className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Drag &amp; drop or{" "}
                    <span className="text-blue-600 underline">click</span> to
                    choose files
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Max file size: 10 MB
                  </p>
                  {/* Hidden input for click-based file selection */}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </>
              )}
              {formData.reportFile && (
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-gray-700 font-medium">
                    {formData.reportFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(formData.reportFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* If a file is selected, show details + remove option */}
            {formData.reportFile && (
              <div className="border bg-gray-50 rounded-md p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {formData.reportFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(formData.reportFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* For a real scenario, you might have a download or preview */}
                  {/* Remove file */}
                  <button
                    className="p-1 text-red-500 hover:text-red-700 flex items-center"
                    onClick={() =>
                      setFormData({ ...formData, reportFile: null })
                    }
                  >
                    <Trash2 className="w-5 h-5 mr-1" />
                    <span className="text-sm cursor-pointer">Remove file</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <span className="text-sm">
            I agree to the{" "}
            <a
              href="/policy"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Policy
            </a>
          </span>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className={`w-full py-2 rounded-lg transition ${
            !isFormValid || submitting
              ? "text-gray-500 bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-red-500 text-white hover:opacity-90"
          }`}
        >
          {submitting ? "Submitting..." : "Continue"}
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default SubscriptionForm;
