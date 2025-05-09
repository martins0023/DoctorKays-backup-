// File: Consultation/Preview.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { Headset, Phone, Play, ScanLine } from "lucide-react";
import { herodoctor1, herodoctor2, herodoctor3 } from "../../assets";
import Trustpilot from "../Feedback/TrustPilot";
import TermsPolicy from "../TermsPolicy";

export default function Preview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <main className="pt-10 px-6 lg:px-12">
        <div className="sm:max-w-5xl max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-row gap-1 items-center bg-white w-fit shadow-md rounded-2xl p-1">
              <Headset className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" />
              <p className="text-sm text-purple-500">24/7 free call services</p>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              Your Journey to <br /> Better Health Starts Here.
            </h1>
            <div className="flex flex-wrap gap-4">
              <a
                href="/subscribe"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5" />
                <span>Book an Appointment</span>
              </a>
              <a
                href="/consultation"
                className="inline-flex items-center space-x-2 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <ScanLine className="w-5 h-5" />
                <span>Scan Report </span>
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L5.25 20.25M9.75 17l-4.5-3.25M9.75 17V9a2.25 2.25 0 014.5 0v8m0 0l4.5-3.25M14.25 20.25L18.75 17"
                />
              </svg>
              <p>
                Book seamlessly with ease, either you want to have a virtual
                consultation or you want your Blood Tests and Scan report
                reviewed.
              </p>
            </div>
          </div>
          {/* Right Image */}
          <div className="flex-1 sm:mt-10 mt-0">
            {/* Social & Trustpilot */}
            <div className="max-w-5xl mx-auto mt-5 flex flex-col lg:flex-col justify-between gap-8">
              <div className="flex space-x-6 underline">
                <a
                  href="https://x.com/doctor_kays"
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href="https://m.facebook.com/Doctorkays/"
                  className="text-gray-400 hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/doctor_kays/"
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-green-400 font-bold text-lg">★ 1.0</span>
                <span className="text-gray-400">Trustpilot</span>
              </div>
            </div>
            <p className="text-gray-400 mt-3 mb-2">
              Proven track record of consistently delivering successful and
              impactful results in 98% of client projects.
            </p>
            <img
              src={herodoctor3}
              alt="Doctors smiling"
              className="w-full rounded-md shadow-2xl"
            />

            <div className="sm:pt-10 pt-10">
              <Trustpilot />
            </div>
          </div>
        </div>

        <TermsPolicy />
      </main>
    </div>
  );
}
