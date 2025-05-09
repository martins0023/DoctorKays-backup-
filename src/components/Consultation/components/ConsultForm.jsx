import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MessageCircle, Info } from "lucide-react";

export default function ConsultForm({ onChange, values }) {
  // values: { name, email, phone, description }
  // onChange: (field, value) => void

  return (
    <div className="mt-8">
      <div className="gap-3">
        <div>
          <p className="font-semibold text-xl text-black pt-5">
            Basic Information
          </p>
          <span className="text-gray-800 text-sm mt-2">
            Enter your basic details for proper analysis and contact purposes so we can tailor your consultation and get back to you quickly and accurately.
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg mt-2 bg-blue-50 border border-blue-100 w-fit hover:bg-blue-100 transition">
          <a href="/policy" className="text-xs text-blue-600 font-medium hover:underline">
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
            onChange={(e) => onChange("name", e.target.value)}
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
            onChange={(e) => onChange("email", e.target.value)}
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
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm border-gray-600 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div className="relative md:col-span-2">
          {/* <MessageCircle className="absolute top-3 left-3 text-gray-400" /> */}
          <textarea
            placeholder="Brief description"
            disabled={!values.email.trim()}
            value={values.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={4}
            className="w-full pl-5 pr-3 pt-3 pb-2 rounded-lg border text-sm text-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>
    </div>
  );
}
