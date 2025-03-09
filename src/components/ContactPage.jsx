import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "./Form";
import { slideInFromLeft } from "../constants/animations";
import Modal from "./Modal";

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFormDataSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch(
        "https://doctorkays-backend-1.onrender.com/api/contact" ||
          "http://localhost:5000/api/contact",
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
          <h1 className="text-3xl font-bold mb-6">Contact Our Team</h1>
          <p className="mb-4">
            Got any questions or inquiries about the product or scaling on our
            platform? We're here to help. Chat to our friendly team 24/7 and get
            onboard in less than 5 minutes.
          </p>
          <Form handleFormDataSubmit={handleFormDataSubmit} />
        </div>
        <div className="border-1 md:order-2 mt-10">
          <div className="border p-6 rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Chat with us</h2>
            <ul className="mb-6">
              <li className="mb-2">
                <a
                  href="https://wa.link/vedmgv"
                  className="text-gray-400 hover:underline"
                >
                  Start a live chat
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="mailto:drkaysofficial@gmail.com"
                  className="text-gray-400 hover:underline"
                >
                  Shoot us an email
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://x.com/doctor_kays"
                  className="text-gray-400 hover:underline"
                >
                  Message us on X
                </a>
              </li>
            </ul>
            <h2 className="text-xl font-bold mb-4">Call us</h2>
            <p className="mb-6">Call our team Mon-Fri from 8am (WAT) to 5pm.</p>
            <a
              href="tel:+2348137812917"
              className="block mb-4 text-gray-400 hover:underline"
            >
              +234 813 781 2917
            </a>
            <h2 className="text-xl font-bold mb-4">Visit us</h2>
            <a href="#" className="block text-gray-400 hover:underline">
              Challenge, Ibadan, Nigeria
            </a>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </motion.div>
  );
};

export default ContactPage;
