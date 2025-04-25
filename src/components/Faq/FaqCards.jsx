// src/components/Faq/FaqCards.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { slideInFromLeft, textVariants } from "../../constants/animations";
import { client } from "../../../lib/client";

export default function FaqCards({ limit }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `
          *[_type == "faq"] 
          | order(question desc) {
            _id,
            question,
            answer
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // slice down to `limit` if provided
  const displayed = typeof limit === "number" ? posts.slice(0, limit) : posts;

  return (
    <div>
      {displayed.map((post, idx) => (
        <div key={post._id} className="flex flex-col mt-5 mb-5">
          <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex items-center justify-center w-[56px] h-[36px] rounded-md">
            <p className="text-white font-semibold text-[20px]">{idx + 1}</p>
          </div>
          <div className="flex flex-col mt-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <motion.p
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-2xl"
              >
                {post.question}
              </motion.p>
              {openIndex === idx ? (
                <ChevronUp className="text-neutral-300 w-6 h-6" />
              ) : (
                <ChevronDown className="text-neutral-300 w-6 h-6" />
              )}
            </div>
            {openIndex === idx && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideInFromLeft}
                className="tracking-wide text-[16px] mt-3"
              >
                <PortableText value={post.answer} />
              </motion.div>
            )}
            <hr className="border-neutral-800 w-full h-[1px] mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

FaqCards.propTypes = {
  limit: PropTypes.number,
};

FaqCards.defaultProps = {
  limit: undefined,
};
