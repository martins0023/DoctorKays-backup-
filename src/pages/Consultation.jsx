import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
  textVariants,
} from "../constants/animations";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import ContactPage from "../components/ContactPage";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { doctor020, doctor1 } from "../assets";
import { useNavigate } from "react-router-dom";

const Consultation = () => {
  const navigate = useNavigate();

  const requestInfo = () => {
    navigate("/contact")
  }
  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 pt-10 px-6"
      >
        <div className="text-center md:mb-10 md:hidden">
          <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
            consultation
          </span>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="pt-12 w-full lg:w-1/2">
            <div className="flex mb-12">
              <div className="md:pt-5">
                <motion.span
                  variants={slideInFromLeft}
                  className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase"
                >
                  Booking & Consulatation
                </motion.span>
                <motion.p
                  variants={slideInFromRight}
                  className=" font-semibold text-[30px] font-montserrat"
                >
                  Booking Details
                </motion.p>
                <p className="text-md tracking-wider gap-auto text-neutral-400">
                  Booking with Doctor Kays is easy and convenient. You can book
                  an appointment through the booking section by
                  selecting any service. You can either have a virtual
                  consultation for convenience or meet him in person if you want
                  it more personal; both options are available. The platform
                  offers an easy-to-use interface that ensures a smooth booking
                  process. 
                  <p className="mt-2"></p>
                  You can see available time slots and book an
                  appointment immediately after selecting the service you want.
                  Doctor Kays's online booking system puts accessibility and
                  efficiency at the core for all users.
                </p>

                <div className="flex justify-center">
                  <Button
                    text="Book Appointment"
                    className="mt-5 hover:bg-primarydark  rounded-tl-full rounded-bl-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950"
                  />
                  <Button
                    onClick={requestInfo}
                    text="Request For More Information"
                    className="mt-5 border hover:bg-gradient-to-r from-purple-400 to-primary border-primary rounded-tr-full rounded-br-full py-2 px-3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 w-full lg:w-1/2 h-fit">
            <motion.img
              variants={slideInFromRight}
              src={doctor020}
              alt="doctor"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
          
          <Pricing />
          <div className="mt-20">
            <ContactPage />
          </div>
        </div>

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

export default Consultation;
