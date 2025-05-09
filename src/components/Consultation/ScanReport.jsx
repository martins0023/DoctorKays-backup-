import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Camera,
  Cpu,
  UserCheck,
  Sparkles,
  LucideChevronRightCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Navbar from "./components/Navbar";
import { aifile } from "../../assets";
import TermsPolicy from "../TermsPolicy";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
  {
    id: "upload",
    label: "Upload PDF / DOC",
    img: aifile,
    Icon: FileText,
    about:
      "Unlock AI/Specialist capabilities for your Scan reports with a simple upload.",
  },
  {
    id: "photo",
    label: "Take a Picture",
    Icon: Camera,
    about:
      "Unlock AI capabilities/specialists for your Scan reports with a simple picture snap from your mobile.",
  },
];

const REVIEW_MODES = [
  {
    id: "ai",
    label: "AI Analysis",
    Icon: Cpu,
    about:
      "Unlock AI capabilities for your Blood tests and Scan reports with intelligent AI engine trained to detect patterns and flag key health indicators.",
  },
  {
    id: "human",
    label: "Doctor Review",
    Icon: UserCheck,
    about:
      "Your report will be reviewed by licensed a healthcare professional for a personalized medical opinion.",
  },
];

export default function ScanReport() {
  const [action, setAction] = useState(null); // "upload" | "photo"
  const [reviewMode, setReviewMode] = useState(null); // "ai" | "human"
  const [loading, setLoading] = useState(false); // ← loading flag
  const reviewRef = useRef(null);

  const navigate = useNavigate();
  // … state, refs, effects

  // Scroll into view when review options appear
  useEffect(() => {
    if (action && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [action]);

  const handleProceed = () => {
    setLoading(true);
    // simulate prep (e.g. fetch presigned URL, initialize camera, etc.)
    setTimeout(() => {
      const path = action === "upload" ? "upload" : "photo";
      navigate(`/consultation/${path}?mode=${reviewMode}`);
      window.scrollTo({ top: 0 });
    }, 800);
  };

  return (
    <div className="bg-gradient-to-b min-h-screen from-gray-900 to-gray-800">
      <Navbar />
      <div className="p-6 lg:p-12 font-sans">
        <h2 className="text-2xl sm:text-3xl font-normal pt-0 sm:pt-10 text-white mb-3">
          How would you like to review your report?
        </h2>
        <p className="font-normal sm:text-lg mb-4 text-md text-gray-400">
        Choose a secure and convenient way to share your medical report for expert insights or AI-powered analysis.
        </p>

        <div className="flex flex-wrap gap-4 mb-5">
          <a
            href="#"
            className="inline-flex text-white items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
            <span>Explore AI Capabilities</span>
          </a>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-7 mb-8">
          {ACTIONS.map(({ id, label, Icon, about }) => (
            <div
              key={id}
              onClick={() => {
                setAction(id);
                setReviewMode(null);
              }}
              className={`
                flex flex-col space-y-4 space-x-4 p-6 cursor-pointer rounded-3xl h-full transition-transform transform hover:-translate-y-2 hover:scale-100
                ${
                  action === id
                    ? "scale-100 bg-white/100 border-2 border-fuchsia-700 ring-opacity-60"
                    : "bg-white/80 hover:shadow-md h-56 transition-transform"
                }
              `}
            >
              <div className="flex items-center justify-center bg-slate-400 p-4 rounded-2xl">
                <Icon className="w-10 h-10 text-purple-600" />
              </div>
              <span className="text-md font-medium mt-4 mb-2 text-gray-900">
                {label}
              </span>
              <span className="text-base font-medium text-gray-700">
                {about}
              </span>

              <div className="flex justify-end relative pb-2 hover:transition-transform">
                <LucideChevronRightCircle className="text-fuchsia-900 w-6 h-6 absolute " />
              </div>
            </div>
          ))}
        </div>

        {/* Review Mode (only once action chosen) */}
        <div className="">
          {action && (
            <div ref={reviewRef} className="mb-8">
              <h3 className="text-xl font-medium text-white mb-4">
                Choose review type
              </h3>
              <p className="font-normal sm:text-lg mb-4 text-md text-gray-400">
              Select how you'd like your medical report reviewed — by advanced AI or a certified doctor, tailored to your needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-7 mb-8">
                {REVIEW_MODES.map(({ id, label, Icon, about }) => (
                  <div
                    key={id}
                    onClick={() => setReviewMode(id)}
                    className={`
                  flex flex-col space-y-4 space-x-4 p-6 rounded-3xl h-full transition-transform transform hover:-translate-y-2 hover:scale-100
                    ${
                      reviewMode === id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }
                  `}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        reviewMode === id ? "text-white" : "text-purple-600"
                      }`}
                    />
                    <span className="font-medium">{label}</span>
                    <span className="font-medium">{about}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Step Button */}
        {action && reviewMode && (
          <div className="flex justify-end">
            <button
              onClick={handleProceed}
              disabled={loading}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-transform
             ${
               loading
                 ? "bg-gray-600 cursor-wait"
                 : "bg-gradient-to-r border border:from-purple-600 to-pink-500 hover:scale-105"
             }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span className="text-white">Proceeding…</span>
                </>
              ) : (
                <>
                  <span className="text-white font-medium">Proceed</span>
                  <ArrowRight className="text-white" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <TermsPolicy />
    </div>
  );
}
