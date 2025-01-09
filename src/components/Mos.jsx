import React from "react";
import { mosvid } from "../assets";
import Button from "./Button";
import { motion } from "framer-motion";
import { staggerContainer } from "../constants/animations";

const Mos = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="mt-20"
    >
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Medicine on the{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Street (MOS).
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="pt-12 w-full lg:w-1/2">
          <div className="flex mb-12">
            <div className="">
              <h5 className="mt-1 mb-2 text-xl">
                JOIN US ON MEDICINE ON THE STREETS OF NIGERIA
              </h5>
              <p className="text-md text-neutral-500">
                Over 200million people in Nigeria, join us on the streets of
                Nigeria and see how we interview people on health issues and
                matters arising
              </p>

              <div className="flex justify-center">
                <Button
                  text="Partner With Us"
                  className="mt-5 hover:bg-white  rounded-tl-full rounded-bl-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950"
                />
                <Button
                  text="Request For More Information"
                  className="mt-5 border hover:bg-primary border-primary rounded-tr-full rounded-br-full py-2 px-3"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 w-full lg:w-1/2 h-fit">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg object-cover w-full h-80 border border-purple-700 shadow-sm shadow-purple-400 mx-2 my-4"
          >
            <source src={mosvid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.div>
  );
};

export default Mos;
