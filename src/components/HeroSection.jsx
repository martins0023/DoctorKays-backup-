import doctorkays from "../assets/doctorkays.jpg";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { fadeIn, slideInFromLeft, slideInFromRight, staggerContainer } from "../constants/animations";

const HeroSection = () => {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={doctorkays}
          alt="Background"
          className="object-cover w-full h-full lg:h-full"
        />
      </div>
      <div className="relative z-10 max-w-4xl px-6 mt-10 text-center text-white justify-center items-center justify-items-center">
        <div className="bg-primarydark w-fit p-2 rounded-full flex justify-center items-center">
          <p className="uppercase text-sm font-semibold tracking-wider bg-gradient-to-r from-white to-purple-400 text-transparent bg-clip-text">
          <Typewriter
            words={['Hola',
                'Bonjour',
                'Hallo',
                'Ciao', 'Hello']}
            loop={false}
            cursor
          />, I AM DOCTOR KAYS
          </p>
        </div>
        <motion.h1 variants={slideInFromLeft} className="mt-4 leading-relaxed text-4xl font-bold sm:text-5xl lg:text-6xl bg-gradient-to-r from-white to-primary text-transparent bg-clip-text tracking-wide">
          Turning medicine from a head-scratcher, into<br /> your friendly
          companion
        </motion.h1>
        <motion.p variants={slideInFromRight} className="mt-6 text-lg text-white">
          From wellness tips to health advice, the mission is to spread health
          education across Africa and beyond.
        </motion.p>
        <div className="flex justify-center mt-8 space-x-4">
          <a
            href="#"
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primarydark"
          >
            Book a consultation
          </a>
          <a
            href="#"
            className="px-6 py-3 text-sm font-medium text-primary bg-white rounded-md hover:bg-white-200"
          >
            Partner with us
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
