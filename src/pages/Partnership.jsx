import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import { slideInFromLeft, staggerContainer } from "../constants/animations";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { paystack } from "../assets";
import Donation from "../components/Donation";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Partnership = ({ onProceedToPayment }) => {
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

  const navigate = useNavigate();
  const handlePolicy = () => {
    navigate("/policy");
  };
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 px-6"
      >
        {/* form */}
        <motion.div variants={slideInFromLeft} className="mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl font-bold mb-6">
                Request for more details
              </h1>
              <p className="mb-4">
                You can request for more details as regarding sponsorship and
                partnership. Partner with us or become a sponsor, request for
                more information by sending us a message.
              </p>
              <Form onSubmit={handleFormSubmit} />
            </div>
            <div className="border-1 md:order-2 mt-10">
              <div className="border p-6 rounded-lg ">
                
                <div className="mb-4 bg-red-600 p-3 gap-2 rounded-lg flex">
                  <div>
                    <Info className="text-white" />
                  </div>
                  <span className="text-white">
                    Thank you for your interest in supporting Medicine on the Streets. This is a movement that listens to real-life health experiences-both inspiring and hearthbreaking-while raising awareness and providing financial assistance to those in need, ensuring no one is left behing in accessing medical care.{" "}
                    {/* <span
                      honClick={handlePolicy}
                      className="text-neutral-200 underline"
                    >
                      Check Out
                    </span> */}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-4">
                  You can directly make donations now
                </h2>
                <ul className="mb-6">
                  <li className="mb-2">
                    <a href="" className="font-semibold">
                      Zenith Bank
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="" className="font-semibold hover:underline">
                      1229495475 (NGN - Naira Account)
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="" className="font-semibold hover:underline">
                      KMC Hospital Limited
                    </a>
                  </li>
                </ul>
                <ul className="mb-6">
                  <li className="mb-2">
                    <a href="" className="font-semibold">
                      Zenith Bank
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="" className="font-semibold hover:underline">
                      5075021695 (USD - Dollar Account)
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="font-semibold hover:underline">
                      Swift Code - ZEIBNGLA
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="" className="font-semibold hover:underline">
                      KMC Hospital Limited
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="tel:+2348137812917"
                      className="text-blue-500 hover:underline"
                    >
                      Send proof to us here
                    </a>
                  </li>
                </ul>
                <h2 className="text-xl font-bold mb-4">
                  Make donation using paystack
                </h2>
                {/* <div className="items-center flex justify-center">
            <img 
              src={paystack}
              alt="paystack"
              className="w-fit h-fit mb-3 cursor-pointer"
            />
            </div> */}
                <Donation />
              </div>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            message={modalMessage}
          />
        </motion.div>

        <Testimonials />
        <Stayintouch />
        <Footer />
      </motion.div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default Partnership;
