import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "./Form";
import { slideInFromLeft } from "../constants/animations";
import Modal from "./Modal";

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
    setModalMessage(
      "Thank you for your message. We will get back to you shortly."
    );
    setIsModalOpen(true);
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
            Got any questions about the product or scaling on our platform?
            We're here to help. Chat to our friendly team 24/7 and get onboard
            in less than 5 minutes.
          </p>
          <Form onSubmit={handleFormSubmit} />
        </div>
        <div className="order-1 md:order-2 mt-10">
          <div className="bg-gradient-to-br from-gray-900 to-purple-9500 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Chat with us</h2>
            <ul className="mb-6">
              <li className="mb-2">
                <a href="#" className="text-primary hover:underline">
                  Start a live chat
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-primary hover:underline">
                  Shoot us an email
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-primary hover:underline">
                  Message us on X
                </a>
              </li>
            </ul>
            <h2 className="text-xl font-bold mb-4">Call us</h2>
            <p className="mb-6">Call our team Mon-Fri from 8am to 5pm.</p>
            <a
              href="tel:+2340000000"
              className="block mb-4 text-primary hover:underline"
            >
              +1(555) 000-0000
            </a>
            <h2 className="text-xl font-bold mb-4">Visit us</h2>
            <a href="#" className="block text-primary hover:underline">
              100 Smith Street, Collingwood VIC 3066
            </a>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </motion.div>
  );
};

export default ContactPage;
