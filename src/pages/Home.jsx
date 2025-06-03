import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BriefAbout from "../components/BriefAbout";
import FeatureSection from "../components/FeatureSection";
import Workflow from "../components/Workflow";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import Booking from "../components/Booking";
import { useNavigate, Link } from "react-router-dom";
import { CalendarHeart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FaqCards from "../components/Faq/FaqCards";
import { textVariants } from "../constants/animations";
import Button from "../components/Button";
import ShopItems from "../components/Ecommerce/HomeDisplay/ShopItems";
import FeedbackCard from "../components/Feedback/FeedbackCard";
import TrustPilot from "../components/Feedback/TrustPilot";

const Home = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate("/consultation"); // Adjust the route as needed
  };

  const handleFaq = () => {
    navigate("/faqs");
    window.scrollTo({ top: 0 });
  };
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto pt-10 px-6">
        <BriefAbout />
        <FeatureSection />
        <Workflow />

        {/* Shop Section */}
        <div className="pt-20">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              shop
            </span>
          </div>
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-3xl sm:text-5xl text-center lg:text-6xl mt-5 mb-5 lg:mt-10 tracking-wide"
          >
            Our Popular{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
              Products
            </span>
          </motion.h2>
          <div className="">
            <ShopItems limit={4} />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              img={<ArrowRight />}
              text="view all"
              className="flex text-sm  items-center bg-gradient-to-r from-purple-600 to-purple-900 
               text-white rounded-3xl px-6 py-3 font-medium uppercase 
               tracking-wide transition-transform transform hover:scale-105"
              onClick={() => {
                navigate("/shop");
                window.scrollTo(0, 0);
              }}
            />
          </div>
        </div>

        {/* booking section */}
        <Booking />
        <div>
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-3xl sm:text-5xl text-center lg:text-6xl mt-10 lg:mt-20 tracking-wide"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
              Questions
            </span>
          </motion.h2>
          <FaqCards limit={4} />
          <div className="flex justify-center mt-6">
            <Button
              img={<ArrowRight />}
              text="view more"
              className="flex text-sm  items-center bg-gradient-to-r from-purple-600 to-purple-900 
               text-white rounded-3xl px-6 py-3 font-medium uppercase 
               tracking-wide transition-transform transform hover:scale-105"
              onClick={handleFaq}
            />
          </div>
        </div>
        <Testimonials />
        <Stayintouch />
        <TrustPilot />
        <FeedbackCard />
        <Footer />
      </div>

      {/* Floating Book a Consultation Button */}
      <Link
        to="https://consultation.doctorkays.com/"
        className="fixed bottom-2 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-950 text-white font-medium px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        {/* <span className="text-lg">+</span> */}
        <CalendarHeart />
        <span>Book Now</span>
      </Link>

      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays </div>
      </footer>
    </>
  );
};

export default Home;
