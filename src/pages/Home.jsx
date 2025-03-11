import React from "react";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BriefAbout from '../components/BriefAbout';
import FeatureSection from '../components/FeatureSection';
import Workflow from '../components/Workflow';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Stayintouch from '../components/Stayintouch';
import Footer from '../components/Footer';
import Mos from '../components/Mos';
import ClinicSeries from '../components/ClinicSeries';
import Booking from '../components/Booking';
import { useNavigate } from 'react-router-dom';
import { CalendarHeart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate('/consultation'); // Adjust the route as needed
  };
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <BriefAbout />
        <FeatureSection />
        <Workflow />
        <Mos />
        <ClinicSeries />
        <Booking />
        <Testimonials />
        <Stayintouch />
        <Footer />
      </div>

      {/* Floating Book a Consultation Button */}
      <button
        onClick={handleConsultationClick}
        className="fixed bottom-2 right-6 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-950 text-white font-medium px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        
        {/* <span className="text-lg">+</span> */}
        <CalendarHeart />
        <span>Book Now</span>
      </button>

      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </>
  )
}

export default Home