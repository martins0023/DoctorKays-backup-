import React from "react";
import { checkaboutlists } from "../constants";
import { doctor010, doctor1 } from "../assets";
import { motion } from "framer-motion";
import {
  bouncex,
  fadeIn,
  pulse,
  slideInFromLeft,
  slideInFromTop,
  staggerContainer,
} from "../constants/animations";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BriefAbout = () => {
  const navigate = useNavigate();
  const handleAbout = () => {
    navigate("/about");
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="mt-20"
    >
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <motion.img
              variants={slideInFromTop}
              src={doctor010}
              alt="doctor"
              className="rounded-xl"
            />
            <motion.p
              variants={slideInFromLeft}
              className="text-base text-neutral-500"
            >
              Doctor Olayiwola is not your run-of-the-mill medical doctor. He is
              a tech lover, family advocate and firm believer in preventive and
              community medicine. His passion lies in promoting health awareness
              through engaging, relatable content that combines storytelling and
              humor.
            </motion.p>
            <div className="justify-center flex mt-1">
              <Button
                onClick={handleAbout}
                img={<ArrowRight />}
                text="Read More"
                variants={pulse}
                className="bg-gradient-to-l from-purple-700 to-red-400 rounded-full w-fit"
              />
            </div>
          </div>
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checkaboutlists.map((item, index) => (
            <div key={index} className="flex mb-12">
              <motion.div
                variants={bouncex}
                className="text-purple-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full"
              >
                {item.icon}
              </motion.div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BriefAbout;
