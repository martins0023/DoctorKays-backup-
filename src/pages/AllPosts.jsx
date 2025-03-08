import React from 'react'
import Navbar from '../components/Navbar'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import Stayintouch from '../components/Stayintouch'
import Allposts from '../components/Allposts'

const AllPosts = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto md:pt-20 px-6">

        {/* all posts */}
        <Allposts />

        {/* <Testimonials /> */}
        <Stayintouch />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  )
}

export default AllPosts