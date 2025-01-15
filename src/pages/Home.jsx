import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import BriefAbout from '../components/BriefAbout'
import FeatureSection from '../components/FeatureSection'
import Workflow from '../components/Workflow'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Stayintouch from '../components/Stayintouch'
import Footer from '../components/Footer'
import Mos from '../components/Mos'
import ClinicSeries from '../components/ClinicSeries'
import Booking from '../components/Booking'

const Home = () => {
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
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Drkays</div>
      </footer>
    </>
  )
}

export default Home