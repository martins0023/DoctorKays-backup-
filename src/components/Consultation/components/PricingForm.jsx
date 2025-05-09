// File: pages/PricingForm.jsx
import React, { useState } from "react";
import { User, Mail, Phone, MessageCircle, Info } from "lucide-react";

export default function PricingForm({ plan, onBack, onSubmit }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, v) => setValues((v0) => ({ ...v0, [field]: v }));

  const canSubmit = Boolean(values.name.trim() && values.email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      // assume onSubmit returns a Promise
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="gap-4 pb-3">
        <div>
          <p className="font-semibold text-xl text-gray-200 pt-4">
            Basic Information
          </p>
          <span className="text-gray-300 text-sm mt-2">
            Enter your basic details for proper analysis and contact purposes so
            we can tailor your consultation and get back to you quickly and
            accurately.
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg mt-2 bg-blue-50 border border-blue-100 w-fit hover:bg-blue-100 transition">
          <a
            href="/policy"
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            Learn more about we use your info.
          </a>
          <Info className="w-4 h-4 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 font-sans">
        {/* Name */}
        <div className="relative">
          <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Your Name"
            disabled={false}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm text-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email Address"
            disabled={!values.name.trim()}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm border-gray-600 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Phone (optional) */}
        <div className="relative md:col-span-2">
          <Phone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            placeholder="Phone (optional)"
            disabled={!values.email.trim()}
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm border-gray-600 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div className="relative md:col-span-2">
          {/* <MessageCircle className="absolute top-3 left-3 text-gray-400" /> */}
          <textarea
            placeholder="Any notes or special requests?"
            disabled={!values.email.trim()}
            value={values.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={4}
            className="w-full pl-5 pr-3 pt-3 pb-2 rounded-lg border text-sm text-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-purple-500 hover:underline"
        >
          ← Change plan
        </button>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition 
            ${
              canSubmit && !loading
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-purple-300 text-white cursor-not-allowed"
            }`}
        >
          {loading ? (
            <>
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
              Processing…
            </>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </form>
  );
}
