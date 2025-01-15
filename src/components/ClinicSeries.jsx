import React from "react";
import { clinicSeries } from "../constants";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import { pulse, staggerContainer } from "../constants/animations";
import Button from "./Button";

const ClinicSeries = () => {
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
        Our Clinic{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Series.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center mb-12 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicSeries.map((post) => (
            <a href={`https://youtu.be/${post.videoId}`}>
              <div
                key={post.id}
                className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
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

export default ClinicSeries;
