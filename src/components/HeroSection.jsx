import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  fadeIn,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
  textVariants,
} from "../constants/animations";
import { viddisplay, videoDr, doctor020 } from "../assets";

const HeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="absolute inset-0">
        {/* Mobile Image (shown on small screens) */}
        <img
          src={doctor020}
          alt="Doctor Kays"
          className="object-cover w-full h-full lg:hidden"
        />

        {/* Desktop Video (shown on large screens) */}
        <video
          autoPlay
          loop
          muted
          className="hidden lg:block object-cover w-full h-full"
        >
          <source src={viddisplay} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <img
          src={doctorkays}
          alt="Background"
          className="object-cover w-full h-full lg:h-full"
        /> */}
      </div>
      <div className="relative z-10 max-w-4xl px-6 mt-10 text-center text-white justify-center items-center justify-items-center">
        <div className="bg-primarydark w-fit p-2 rounded-full flex justify-center items-center">
          <p className="uppercase text-sm font-semibold tracking-wider bg-gradient-to-r from-white to-purple-400 text-transparent bg-clip-text">
            <Typewriter
              words={["Hola", "Bonjour", "Hallo", "Ciao", "Hello"]}
              loop={false}
              cursor
            />
            , I AM DOCTOR KAYS
          </p>
        </div>
        <motion.h5
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mt-4 md:pb-2 h-full text-2xl font-semibold sm:text-3xl lg:text-5xl text-white bg-clip-text tracking-normal"
        >
          Turning medicine from a head-scratcher, into your friendly companion
        </motion.h5>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={slideInFromRight}
          className="mt-6 text-lg text-white"
        >
          From wellness tips to health advice, the mission is to spread health
          education across Africa and beyond.
        </motion.p>
        <div className="flex justify-center mt-8 space-x-4">
          <a
            href="/consultation"
            className="px-6 py-3 hidden lg:block text-sm font-medium text-white bg-primary rounded-md hover:bg-primarydark"
          >
            Book a consultation
          </a>
          <a
            href="/partnership"
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
