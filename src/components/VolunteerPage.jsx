import React, { useState } from "react";
import { motion } from "framer-motion";
import VolunteerForm from "./VolunteerForm";
import { slideInFromLeft } from "../constants/animations";
import Modal from "./Modal";

const VolunteerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFormDataSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch(
        "https://doctorkays-backend-1.onrender.com/api/volunteer" ||
          "http://localhost:5000/api/volunteer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log("HTTP status:", response.status);

      // If the response is not OK, it might be an HTML page (404, 500, etc.)
      if (!response.ok) {
        // Try to read text to see what we got
        const errorText = await response.text();
        console.log("Error text response:", errorText);
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      console.log("Parsed JSON result:", result);

      if (response.ok) {
        // The data was saved and email sent successfully
        setModalMessage(
          "Thank you for your message. We have received your request and sent a confirmation email."
        );
        setIsModalOpen(true);
      } else {
        setModalMessage(
          "Oops! There was an error sending your request. Please try again."
        );
        setIsModalOpen(true);
      }
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error submitting contact data:", error);
      setModalMessage(
        "An unexpected error occurred. Please check your connection and try again."
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <motion.div variants={slideInFromLeft} className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-bold mb-6">Volunteer With Our Team</h1>
          <p className="mb-4">
            Have you been inspired or have a thing for help in one way or the
            other, either through community outreaches or you just want to
            contribute the knowledge from your field, to what{" "}
            <a
              href="https://www.doctorkays.com/about"
              className="font-bold text-purple-600 underline"
            >
              DOCTOR KAYS
            </a>{" "}
            is doing. Reach out to us.
          </p>
          <VolunteerForm handleFormDataSubmit={handleFormDataSubmit} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </motion.div>
  );
};

export default VolunteerPage;
