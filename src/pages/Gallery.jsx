import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pulse, staggerContainer, textVariants } from "../constants/animations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stayintouch from "../components/Stayintouch";
import Testimonials from "../components/Testimonials";
import { ArrowRightCircle } from "lucide-react";
import { client } from "../../lib/client";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [clinicSeries, setClinicSeries] = useState([]);
  const [mosSeries, setMosSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          {
            "clinicSeries": *[_type == "clinicseries"] | order(date desc) {
              _id,
              category,
              title,
              slug,
              watchtime,
              date,
              "imageUrl": image[0].asset->url,
              "descriptionText": coalesce(description[0].children[0].text, "")
            },
            "mosSeries": *[_type == "mos"] | order(date desc) {
              _id,
              category,
              title,
              slug,
              watchtime,
              videoId,
              date,
              "descriptionText": coalesce(description[0].children[0].text, "")
            }
          }
        `;
        const { clinicSeries, mosSeries } = await client.fetch(query);
        setClinicSeries(clinicSeries);
        setMosSeries(mosSeries);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ["All", "Clinic Series", "MOS", "Health Nuggets"];

  const filterItems = () => {
    if (filter === "All") return [...clinicSeries, ...mosSeries];
    if (filter === "Clinic Series") return clinicSeries;
    if (filter === "MOS") return mosSeries;
    return []; // Future: add logic for "Health Nuggets"
  };

  const filteredItems = filterItems().filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto flex-1 border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white placeholder-gray-400"
            />

            <select
              className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white"
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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

          {/* Render Items */}
          <div className="flex flex-wrap justify-center mb-10 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.map((post) => (
                <a
                  href={`https://youtu.be/${post.videoId || ""}`}
                  key={post._id}
                >
                  <div className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer">
                    {post.videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&mute=1`}
                        title={post.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        allow="autoplay; encrypted-media"
                      ></iframe>
                    ) : (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
                      <p className="text-sm text-primary font-medium">
                        #{post.category}
                      </p>
                    </div>
                    <h3 className="text-xl text-white font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {truncateText(post.descriptionText, 20)}
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
                        {post.watchtime || "N/A"} watch
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

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
