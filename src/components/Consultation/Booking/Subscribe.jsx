// File: pages/Subscribe.jsx
import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PricingForm from "../components/PricingForm";
import { pricingOptions } from "../../../constants";
import TermsPolicy from "../../TermsPolicy";
import axios from "axios";

const API_BASE = "https://doctorkays-backend-1.onrender.com";

export default function Subscribe() {
  const [step, setStep] = useState("choose"); // "choose" or "details"
  const [selectedPlan, setSelectedPlan] = useState(null);
  const formRef = useRef(null);

  // toast state
  const [toast, setToast] = useState(null);

  // whenever we enter "details" step, scroll form into view:
  useEffect(() => {
    if (step === "details" && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  function handlePlanSelect(option) {
    setSelectedPlan(option);
    setStep("details");
  }

  const handleFormSubmit = async (values) => {
    // build FormData exactly like UploadPage
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("story", values.notes);
    formData.append("consultationType", selectedPlan.id);

    try {
      const { data } = await axios.post(
        `${API_BASE}/api/free-subscription`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setToast({ type: "success", message: "Your booking was saved!" });
      // reset to first step
      setStep("choose");
      setSelectedPlan(null);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to save booking." });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <Navbar />

      <div className="">
        {/* --- STEP 1: Choose a plan --- */}
        {step === "choose" && (
          <div className="max-w-6xl mx-auto py-12 px-4 font-sans">
            {/* <div className="text-center">
              <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
                booking
              </span>
            </div> */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sm:text-4xl text-3xl font-bold text-center mb-3 text-white"
            >
              Appointment {` `}
              <span className="bg-gradient-to-r from-purple-500 to-red-400 text-transparent bg-clip-text">
                Booking
              </span>
            </motion.h1>
            <motion.p className="text-center  mb-7 sm:text-3xl text-lg text-gray-100">
              Get Booked and more with just One click with KMC Premium plan
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow p-8 flex flex-col"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    {option.title}
                    {option.title === "Family Package" && (
                      <span className="bg-gradient-to-r from-purple-500 to-red-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                        <br />
                        (Emergency)
                      </span>
                    )}
                  </h2>

                  <div className="mb-6">
                    {option.originalPrice && (
                      <span className="line-through text-gray-400 mr-2">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-bold">{option.price}</span>
                    <span className="text-gray-500 ml-1">/ {option.type}</span>
                  </div>

                  <ul className="flex-1 space-y-3 mb-6">
                    {option.features.map((feat, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="text-green-500 mr-2" />
                        <span className="text-gray-700">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelect(option)}
                    className="mt-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Select
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 2: Details Form --- */}
        {step === "details" && selectedPlan && (
          <div ref={formRef} className="max-w-3xl mx-auto py-12 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-medium mb-3 font-sans text-white"
            >
              You chose “{selectedPlan.title}”
            </motion.h2>
            <p className="text-gray-400 mb-4">{selectedPlan.description}</p>

            {/* Your reusable form component */}
            <PricingForm
              plan={selectedPlan}
              onBack={() => setStep("choose")}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}
        {toast && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          {toast.message}
        </div>
      )}
      </div>
      <TermsPolicy />
    </div>
  );
}
