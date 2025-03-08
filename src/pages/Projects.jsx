import React from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import UpcomingProjects from "../components/UpcomingProjects";
import Mos from "../components/Mos";
import ClinicSeries from "../components/ClinicSeries";

const Projects = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto md:pt-20 px-6">
        <UpcomingProjects />
        <Mos />
        <ClinicSeries />
        <Testimonials />
        <Stayintouch />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default Projects;
