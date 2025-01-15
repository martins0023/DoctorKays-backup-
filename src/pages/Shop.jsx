import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariants } from "../constants/animations";
import Shopcards from "../components/Shopcards";
import Navbar from "../components/Navbar";

const Shop = () => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 px-6"
      >
        <div className="relative mt-20 border-neutral-800 ">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              SHOP
            </span>
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
            >
              See Our{" "}
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                Merchs and Products
              </span>
            </motion.h2>
          </div>
        </div>

        <Shopcards />
      </motion.div>
    </div>
  );
};

export default Shop;
