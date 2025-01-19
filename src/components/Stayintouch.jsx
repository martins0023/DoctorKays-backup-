import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import emailjs from "emailjs-com"; // Import Email.js

const Stayintouch = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (email) {
      try {
        // Use Email.js to send email data
        const templateParams = {
          email, // Pass the user's email to the template
        };

        await emailjs.send(
          "service_qo2uuhc", // Replace with your Email.js Service ID
          "template_0c34mab", // Replace with your Email.js Template ID
          templateParams,
          "5_DaWBIfSUtw3os8H" // Replace with your Email.js Public Key
        );

        // Show success message
        setModalMessage(
          "Thank you for subscribing. Your email has been successfully received."
        );
      } catch (error) {
        console.error("Error sending email:", error);
        setModalMessage("Oops! Something went wrong. Please try again later.");
      }

      setIsModalOpen(true);
      setEmail(""); // Clear the email input after successful subscription
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-3 p-4">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Stay in{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Touch.
        </span>
      </h2>
      <p className="text-[14px] text-center mb-5 mt-5">
        Stay connected to our community and never miss out on exciting updates.
      </p>

      <div className="flex flex-row items-center justify-center justify-items-center mb-[63px]">
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
          className="text-[14px] font-regular border h-[56px] p-3 w-full max-w-md border-primary"
        />
        <Button
          text="Subscribe"
          className="bg-gradient-to-r from-purple-600 to-purple-950 rounded-none text-[14px] font-semibold text-white h-[56px]"
          onClick={handleSubscribe}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default Stayintouch;
