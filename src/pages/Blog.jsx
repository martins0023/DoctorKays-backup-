import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stayintouch from "../components/Stayintouch";
import Testimonials from "../components/Testimonials";
import BlogPosts from "../components/BlogPosts";
import { motion } from "framer-motion";
import { slideInFromLeft, staggerContainer } from "../constants/animations";

const Blog = () => {
  return (
    <div>
      <Navbar />
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-7xl mx-auto md:pt-20 px-6">
        <div className="text-center mt-10">
          <motion.span variants={slideInFromLeft} className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
            Blog
          </motion.span>
          {/* <motion.h2
            variants={slideInFromLeft}
            className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 tracking-wide"
          >
            Blog{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
              Posts
            </span>
          </motion.h2> */}
        </div>
        <BlogPosts />
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

export default Blog;
