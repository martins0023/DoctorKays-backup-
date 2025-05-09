import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import TermsPolicy from "../TermsPolicy";
import axios from "axios";
import FullScreenError from "./components/FullScreenError";
import FullScreenLoader from "./components/FullScreenLoader";
import { ArrowLeft, Home, Wand } from "lucide-react";

// Simple typewriter hook
function Typewriter({ text, speed = 30, className }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let idx = 0;
    setDisplay("");
    const timer = setInterval(() => {
      setDisplay((d) => d + text[idx]);
      idx++;
      if (idx >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <p className={className}>{display}</p>;
}

const API_BASE = "https://doctorkays-backend-1.onrender.com";

export default function AIAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [rawOutput, setRawOutput] = useState("");
  const [error, setError] = useState("");

  // 1) fetch the saved consultation
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/consultation/${id}`)
      .then(res => setReport(res.data.consultation))
      .catch(err => {
        console.error(err);
        setError("Failed to load consultation record.");
      });
  }, [id]);

  // 2) request AI analysis
  useEffect(() => {
    if (!report?.reportFileUrl) return;

    setLoading(true);
    axios
      .post(`${API_BASE}/api/ai-analysis`, {
        fileUrl: report.reportFileUrl,
        userName: report.name,
        userStory: report.story || report.description,
      })
      .then(res => {
        console.log("✅ AI Analysis Response:", res.data); // Check full API re
        setAnalysis(res.data.analysis);
        setRawOutput(res.data.raw || "");
      })
      .catch(err => {
        console.error(err);
        setError("AI analysis failed.");
      })
      .finally(() => setLoading(false));
  }, [report]);

  if (error) {
    return <FullScreenError message={error} />;
  }

  if (loading || !analysis) {
    return <FullScreenLoader message="Analyzing your report… one moment, please!" />;
  }

  const sections = [
    "Overall Purpose and Context",
    "Structure and Format",
    "Content Analysis (Section by Section)",
    "Strengths of the Sample Report",
    "Weaknesses / Areas for Improvement",
    "Key Takeaways & Implications",
    "Conclusion",
    "Next Steps & Recommendations",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />

      {/* Top nav */}
      <div className="flex justify-between items-center max-w-4xl mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex bg-white rounded-md p-2 items-center text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <Link
          to="/"
          className="inline-flex items-center bg-white rounded-md p-2 text-gray-700 hover:text-gray-900"
        >
          <Home className="w-5 h-5 mr-1" /> Home
        </Link>
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-8 font-sans">
        <div className="flex gap-1 items-center">
        <h1 className="text-3xl font-bold">AI Analysis Results</h1>
        <Wand className="w-7 h-7"/>
        </div>

        {sections.map((heading) => {
          const body = analysis[heading];
          if (!body) return null;
          return (
            <section key={heading} className="bg-white p-6 rounded-lg shadow">
              <h2 className="sm:text-2xl text-xl font-medium mb-2 text-gray-300">{heading}</h2>
              <Typewriter
                text={body}
                speed={20}
                className="text-gray-700 whitespace-pre-wrap leading-relaxed"
              />
            </section>
          );
        })}

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-black">Your Output</h2>
          <Typewriter
            text={rawOutput}
            speed={5}
            className="text-gray-600 font-mono whitespace-pre-wrap"
          />
        </section>
      </main>
      <TermsPolicy />
    </div>
  );
}
