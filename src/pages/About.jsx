import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { doctor004, doctor005, doctor006, doctor007, doctor008, doctor009, doctor1, mos } from "../assets";
import Button from "../components/Button";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import { mission } from "../constants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  bounce,
  bouncex,
  pulse,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
} from "../constants/animations";
import Milestones from "../components/Milestones";

const About = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true, //count only once when in view
    threshold: 0.5, //trigger when 50% of the element is in view
  });

  const requestInfo = () => {
    navigate("/contact");
  };

  const partnerWithMe = () => {
    navigate("/partnership");
  };
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 px-6"
      >
        <div className="flex flex-wrap justify-center">
          <div className="pt-12 w-full lg:w-1/2">
            <div className="flex mb-12">
              <div className="md:pt-5">
                <motion.span
                  variants={slideInFromLeft}
                  className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase"
                >
                  About Doctor Kays
                </motion.span>
                <motion.p
                  variants={slideInFromRight}
                  className=" font-semibold text-[30px] font-montserrat"
                >
                  Meet Doctor Kays
                </motion.p>
                <p className="text-md tracking-wider gap-auto text-neutral-400">
                  Doctor Olayiwola is not your run-of-the-mill medical doctor.
                  He is a tech lover, family advocate and firm believer in
                  preventive and community medicine. His passion lies in
                  promoting health awareness through engaging, relatable content
                  that combines storytelling and humor.
                  <p className="mt-2">
                    Weekly, through our unique content pillars—Health Nuggets,
                    Clinic Series, Clinic online and the interactive street
                    segment Medicine on the Street with Dr. Kays— We explore
                    lifestyle, disease prevention, general health and wellness.
                  </p>
                  <p className="mt-2">
                    <strong>Our mission</strong> <br />Is to turn medicine from a head-scratcher into
                    your friendly companion - relatable, understandable, and
                    yes, even a bit fun!
                  </p>
                  <p className="mt-2"></p>
                  We align our works with the World Health Organization calendar
                  and delve into trending medical topics to ensure our audience
                  stays informed and empowered. That’s our promise - making your
                  health journey an adventure you won’t want to miss!
                </p>

                <div className="flex justify-center">
                  <Button
                    onClick={partnerWithMe}
                    text="Partner With Me"
                    className="mt-5 hover:bg-white  rounded-tl-full rounded-bl-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950"
                  />
                  <Button
                    onClick={requestInfo}
                    text="Request For More Information"
                    className="mt-5 border hover:bg-primary border-primary rounded-tr-full rounded-br-full py-2 px-3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 w-full lg:w-1/2 h-fit">
            <motion.img
              variants={slideInFromRight}
              src={doctor009}
              alt="doctor"
              className="rounded-xl"
            />
          </div>
        </div>

        {/* the mission */}
        <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
              Doctor Kays{" "}
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                Mission
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full lg:w-1/2 h-fit">
              <img src={doctor008} alt="Doctor" className="mt-5 rounded-xl" />
            </div>
            <div className="pt-12 w-full lg:w-1/2">
              {mission.map((item, index) => (
                <div key={index} className="flex mb-12">
                  <motion.div
                    variants={bouncex}
                    className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-purple-700 justify-center items-center rounded-full"
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h5 className="mt-1 mb-2 text-xl">{item.text}</h5>
                    <p className="text-md text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* satisfied clients */}
          <div className="md:flex items-center justify-items-center justify-center gap-10 mb-10">
            <div className="justify-center justify-items-center mt-10">
              <div ref={ref}>
                {inView && (
                  <CountUp
                    className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20"
                    end={2}
                    duration={9}
                    suffix="+"
                  />
                )}
                <p className="text-lg text-neutral-500">Projects</p>
              </div>
            </div>

            <div className="justify-center justify-items-center mt-10">
              <div ref={ref}>
                {inView && (
                  <CountUp
                    className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20"
                    end={500}
                    duration={9}
                    suffix="+"
                  />
                )}
                <p className="text-lg text-neutral-500">Satisfied clients</p>
              </div>
            </div>

            <div className="justify-center justify-items-center mt-10">
              <div ref={ref}>
                {inView && (
                  <CountUp
                    className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20"
                    end={10}
                    duration={9}
                    suffix="+"
                  />
                )}
                <p className="text-lg text-neutral-500">Countries</p>
              </div>
            </div>
          </div>
        </div>
        <Milestones />
        <Testimonials />
        <Stayintouch />
        <Footer />
      </motion.div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default About;
