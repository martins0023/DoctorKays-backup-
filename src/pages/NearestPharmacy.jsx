import React from 'react'
import Navbar from '../components/Navbar'
import NearbySuggestions from '../components/NearbySuggestions'
import Footer from '../components/Footer'

const NearestPharmacy = () => {
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8 p-4">
        <NearbySuggestions />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  )
}

export default NearestPharmacy