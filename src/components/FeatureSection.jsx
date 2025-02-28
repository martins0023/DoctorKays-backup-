import { features } from "../constants";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  bounce,
  bouncex,
  pulse,
  slideInFromLeft,
  staggerContainer,
  textVariants,
} from "../constants/animations";
import { ChevronRight, ChevronRightCircle } from "lucide-react";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative mt-20 border-b border-neutral-800 min-h-[800px]"
    >
      <div className="text-center">
        <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Feature
        </span>
        <motion.h2
          variants={slideInFromLeft}
          className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
        >
          Want to know{" "}
          <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
            what we're up to?
          </span>
        </motion.h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20 transition-transform duration-300 group-hover:bg-white cursor-pointer">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl"
          >
            <div className="flex">
              <motion.div
                variants={bounce}
                className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-purple-700 justify-center items-center rounded-full"
              >
                {feature.icon}
              </motion.div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <motion.p
                  variants={textVariants}
                  className="text-md p-2 mb-20 text-neutral-500"
                >
                  {feature.description}
                  <motion.div
                    onClick={() => {navigate(feature.url);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    
                    className="flex flex-row items-center p-3 mt-3 gap-2 h-fit w-fit rounded-full cursor-pointer"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{
                      backgroundPosition: ["0% 20%", "100% 40%", "0% 80%"],
                    }}
                    transition={{
                      duration: 1,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #6a0dad, #ff007f)",
                      backgroundSize: "200% 200%",
                    }}
                  >
                    <p className="text-white font-normal">check out</p>
                    <ChevronRightCircle className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureSection;
