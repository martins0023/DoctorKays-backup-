import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VolunteerPage from "../components/VolunteerPage";

const Volunteer = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto md:pt-20 px-6">
        <VolunteerPage />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default Volunteer;
