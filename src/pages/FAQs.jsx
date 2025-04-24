import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  staggerContainer,
  textVariants,
} from "../constants/animations";
import FaqCards from "../components/Faq/FaqCards";

const FAQs = () => {

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
              FAQs
            </span>
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
            >
              See Frequently{" "}
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                Asked Questions
              </span>
            </motion.h2>
          </div>
          <div className="flex flex-col mt-10 lg:mt-20">
            <FaqCards />
          </div>
        </div>
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

export default FAQs;
