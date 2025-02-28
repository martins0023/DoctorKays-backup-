import React from "react";
import { motion } from "framer-motion";
import {
  bouncex,
  continuousTextAnimation,
  pulse,
  slideInFromRight,
  staggerContainer,
  textVariants,
} from "../constants/animations";
import Shopcards from "../components/Shopcards";
import Navbar from "../components/Navbar";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { bgback1, bgback2, bgback3, bgback4, ecomm1, ecomm2, ecomm3, ecomm4 } from "../assets";

const Shop = ({isDarkMode}) => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative flex items-center justify-left h-screen bg-gray-900"
      >
        <div className="absolute inset-0">
          <img
          src={ecomm3}
          alt="Background"
          className="object-cover w-full h-full lg:h-full"
        />
        </div>
        <div className="relative z-10 max-w-4xl px-6 text-center text-white justify-start items-start justify-items-start">
          <motion.h5
            initial="hidden"
            animate="visible"
            variants={continuousTextAnimation}
            className="md:pb-2 h-full text-4xl text-left font-bold sm:text-3xl lg:text-5xl text-white bg-clip-text tracking-normal"
          >
            Empowering your wellness journey to support your healthy lifestyle.
          </motion.h5>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
            className="mt-6 text-lg text-left font-normal text-white"
          >
            Welcome to Doctor Kays Shop - your trusted destination for premium
            healthcare products and wellness essentials....
          </motion.p>

          <motion.div className="flex justify-center mt-8">
            <Button
              href="#"
              img={<ArrowRight />}
              className="px-6 py-3 text-sm font-medium text-primary bg-white rounded-md hover:bg-white-200"
              variants={bouncex}
              text="Shop now"
            />
          </motion.div>
        </div>
      </motion.div>

      <Shopcards isDarkMode={isDarkMode} />
    </div>
  );
};

export default Shop;
