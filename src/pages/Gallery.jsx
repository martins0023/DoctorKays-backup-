import React, { useState } from "react";
import { motion } from "framer-motion";
import { pulse, staggerContainer, textVariants } from "../constants/animations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stayintouch from "../components/Stayintouch";
import Testimonials from "../components/Testimonials";
import { clinicSeries, mosSeries } from "../constants";
import { ArrowRightCircle } from "lucide-react";
import { mosvid } from "../assets";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Health Nuggets", "Medicine on the Street", "Clinic Series"];
  
  // Combine all series and filter based on the selected tag and search query
  const allItems = [...clinicSeries, ...mosSeries];
  const filteredItems = allItems.filter((post) => {
    const matchesCategory = filter === "All" || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
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
        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              GALLERY
            </span>
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
            >
              Browse Through{" "}
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                Our Gallery
              </span>
            </motion.h2>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-wrap items-center justify-between mt-10 mb-6 gap-4">
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto flex-1 border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white placeholder-gray-400"
            />

            {/* Sort Dropdown */}
            <select
              className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">Sort by: All</option>
              <option value="Health Nuggets">Health Nuggets</option>
              <option value="Medicine on the Street">Medicine on the Street</option>
              <option value="Clinic Series">Clinic Series</option>
            </select>
          </div>

          {/* Filter Tags */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  filter === category
                    ? "bg-gradient-to-l from-purple-700 to-purple-400 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* mos series */}
          <div className="flex flex-wrap justify-center mb-10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.map((post) => (
                <a href={`https://youtu.be/${post.videoId}`}>
                  <div
                    key={post.id}
                    className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer"
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    >
                      <source src={mosvid} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
                      <p className="text-sm text-primary font-medium">
                        #{post.category}
                      </p>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {truncateText(post.description, 20)}
                      <span className="text-white"> read more</span>{" "}
                    </p>
                    <div className="flex justify-between items-center">
                      <motion.div
                        variants={pulse}
                        className="flex items-center"
                      >
                        <ArrowRightCircle />
                      </motion.div>
                      <span className="text-sm text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* clinic series */}
          <div className="flex flex-wrap justify-center mb-12 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.map((post) => (
                <a href={`https://youtu.be/${post.videoId}`}>
                  <div
                    key={post.id}
                    className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
                      <p className="text-sm text-primary font-medium">
                        #{post.category}
                      </p>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {truncateText(post.description, 20)}
                      <span className="text-white"> read more</span>{" "}
                    </p>
                    <div className="flex justify-between items-center">
                      <motion.div
                        variants={pulse}
                        className="flex items-center"
                      >
                        <ArrowRightCircle />
                      </motion.div>
                      <span className="text-sm text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* health nuggets */}

          {filteredItems.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No items match your search or filter criteria.
            </div>
          )}
        </div>
        <Testimonials />
        <Stayintouch />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Gallery;
