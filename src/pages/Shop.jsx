import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  bouncex,
  continuousTextAnimation,
  slideInFromRight,
  staggerContainer,
} from "../constants/animations";
import Shopcards from "../components/Shopcards";
import Navbar from "../components/Navbar";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { sorebg3, storebg1, storebg2 } from "../assets";

const images = [
  sorebg3,
  storebg1,
  storebg2,
];

const Shop = ({ isDarkMode }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change images every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const shopSectionRef = useRef(null);

  const scrollToShopping = () => {
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Background ${index + 1}`}
              className={`absolute inset-0 object-cover w-full h-full lg:h-full transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
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
            className="mt-6 text-lg text-left font-normal text-"
          >
            Welcome to Doctor Kays Shop - your trusted destination for premium
            healthcare products, medical devices and wellness essentials....
          </motion.p>

          <motion.div className="flex justify-center mt-8">
            <Button
              onClick={scrollToShopping}
              img={<ArrowRight />}
              className="px-6 py-3 border text-sm font-medium text-primary bg-white rounded-full hover:bg-white-200"
              variants={bouncex}
              text="Shop now"
            />
          </motion.div>
        </div>
      </motion.div>

      <div ref={shopSectionRef}>
        <Shopcards isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Shop;
