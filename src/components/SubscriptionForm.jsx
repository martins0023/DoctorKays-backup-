// src/components/SubscriptionForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionForm = ({ option, onClose, onProceedToPayment }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: option?.title || "",
    price: option?.price || "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = "https://doctorkays-backend-1.onrender.com" || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Saved consultation:", result);
      
      // Proceed to payment modal with form data if saving was successful
      onProceedToPayment(formData);
    } catch (error) {
      console.error("Error saving consultation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Form is valid if name and email are non-empty and the checkbox is checked.
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    agreed;

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Subscribe to {option?.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
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
          className={`w-full py-2 rounded-lg transition bg-opacity ${
            !isFormValid || submitting
              ? "text-gray-500 bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-red-500 text-white hover:opacity-90"
          }`}
        >
          {submitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
