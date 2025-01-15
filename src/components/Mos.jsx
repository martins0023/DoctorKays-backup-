import React from "react";
import { mosvid } from "../assets";
import { ArrowRightCircle } from "lucide-react";
import { clinicSeries, mosSeries } from "../constants";
import Button from "./Button";
import { motion } from "framer-motion";
import { staggerContainer, pulse } from "../constants/animations";
import { useNavigate } from "react-router-dom";

const Mos = () => {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const navigate = useNavigate();
  const handleGallery = () => {
    navigate("/gallery");
  };
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
      <div className="flex flex-wrap justify-center mb-10 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mosSeries.map((post) => (
            <a href={`https://youtu.be/${post.videoId}`}>
              <div
                key={post.id}
                className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer"
              >
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-40 object-cover rounded-lg mb-4"
                >
                  <source src={mosvid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
                  <p className="text-sm text-primary font-medium">
                    #{post.category}
                  </p>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {truncateText(post.description, 20)}
                  <span className="text-white"> read more</span>{" "}
                </p>
                <div className="flex justify-between items-center">
                  <motion.div variants={pulse} className="flex items-center">
                    <ArrowRightCircle />
                  </motion.div>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="justify-center flex">
        <Button
          onClick={handleGallery}
          text="view all"
          variants={pulse}
          className="text-[16px] p-4 cursor-pointer hover:bg-primarydark rounded-full w-fit"
        />
      </div>
    </motion.div>
  );
};

export default Mos;
