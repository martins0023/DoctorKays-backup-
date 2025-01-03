import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariants } from "../constants/animations";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import ContactPage from "../components/ContactPage";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";

const Consultation = () => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 px-6"
      >
        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              consultation
            </span>
            <Pricing />
          </div>
          <div className="mt-20">
            <ContactPage />
          </div>
        </div>

        <Testimonials />
        <Stayintouch />
        <Footer />
      </motion.div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Drkays</div>
      </footer>
    </div>
  );
};

export default Consultation;
