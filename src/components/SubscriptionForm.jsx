// src/components/SubscriptionForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionForm = ({ option, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: option?.title || "",
    price: option?.price || "",
  });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here, send formData to your backend or email service.
    onClose();
    // Optionally, navigate to a thank-you page:
    // navigate('/thank-you');
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Subscribe to {option?.title}
      </h2>
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
          <span className="text-sm">I agree to the <a href="/policy" className="text-blue-500 underline">Terms and Policy</a></span>
        </div>
        <button
          type="submit"
          disabled={!agreed}
          className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
