import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import { pulse, staggerContainer } from "../constants/animations";
import Button from "./Button";
import { PortableText } from "@portabletext/react";
import { client } from "../../lib/client";

const ClinicSeries = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "clinicseries"] | order(date desc) {
            _id,
            category,
            title,
            slug,
            watchtime,
            videoId,
            date,
            "imageUrl": image[0].asset->url,
            "descriptionText": coalesce(description[0].children[0].text, "") // Get the first block of text safely
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const navigate = useNavigate();
  const handleGallery = () => {
    navigate("/gallery");
    window.scrollTo(0, 0);
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="mt-20"
    >
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Latest Clinic Series Upload & Health Nuggets Upload{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Series.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center mb-12 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
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
                <h3 className="text-xl text-white font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {truncateText(post.descriptionText, 20)}
                  <span className="text-white"> read more</span>{" "}
                </p>
                <div className="flex justify-between items-center">
                  <motion.div variants={pulse} className="flex items-center">
                    <ArrowRightCircle />
                  </motion.div>
                  <span className="text-sm text-gray-400">
                    {post.watchtime} watch
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="justify-center flex">
        <Button
          onClick={handleGallery}
          text="view all"
          variants={pulse}
          className="text-[16px] border-primary border-[0.5px] p-4 cursor-pointer hover:bg-primarydark rounded-full w-fit"
        />
      </div>
    </motion.div>
  );
};

export default ClinicSeries;
