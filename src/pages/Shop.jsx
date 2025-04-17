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
import {
  sorebg3,
  storebg1,
  storebg2,
  storebg4,
  storebg5,
  storebg6,
} from "../assets";

const images = [storebg5, storebg1, storebg4];

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
      >
        {/* <div className="absolute inset-0">
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
        </div> */}
        <section className="relative bg-gradient-to-br from-gray-900 to-blue-900 py-16">
          <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 lg:px-24">
            {/* Text Column */}
            <div className="w-full md:w-1/2 text-white">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-zinc-200 via-fuchsia-300 to-purple-800 leading-tight pb-3"
              >
                Empowering your wellness journey to support your healthy
                lifestyle.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-lg"
              >
                Welcome to Doctor Kays Shop – your trusted destination for
                premium healthcare products, medical devices, and wellness
                essentials. Discover top‑quality gear to keep you feeling your
                best, every day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8"
              >
                <Button
                  onClick={scrollToShopping}
                  img={<ArrowRight className="w-5 h-5 text-primary" />}
                  className="inline-flex items-center px-8 py-3 bg-white text-primary font-medium 
                       rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  text="Shop Now"
                />
              </motion.div>
            </div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center"
            >
              <img
                src={storebg6}
                alt="Medical Equipment"
                className="w-4/5 md:w-full rounded-xl shadow-xl object-cover"
              />
            </motion.div>
          </div>
        </section>
      </motion.div>

      <div ref={shopSectionRef}>
        <Shopcards isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Shop;
