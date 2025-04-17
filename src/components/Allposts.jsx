import React, { useEffect, useState } from "react";
import { clinic1, clinic3, doc1 } from "../assets";
import { useNavigate } from "react-router-dom";
import { client, urlFor } from "../../lib/client";

const Allposts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "blog"] | order(date desc) {
            _id,
            title,
            slug,
            category,
            section,
            author,
            date,
            "imageUrl": image[0].asset->url,
            "descriptionText": coalesce(description[2].children[0].text, "") // Get the first block of text safely
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

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Sleeping",
    "Cancer",
    "Sex Education",
  ];

  // Combine all series and filter based on the selected tag and search query
  const allItems = [];
  const filteredItems = allItems.filter((post) => {
    const matchesCategory = filter === "All" || post.category === filter;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const navigate = useNavigate();

  const handleNavigate = (post) => {
    navigate(`/blog/${post.slug.current}`);
  };
  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between mt-10 mb-6 gap-4">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto flex-1 border border-gray-700 rounded-3xl px-4 py-2 placeholder-gray-400"
        />

        {/* Sort Dropdown */}
        {/* <select
          className="border border-gray-700 rounded-lg px-4 py-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Sort by: All</option>
          <option value="Health Nuggets">Sleeping</option>
          <option value="Medicine on the Street">Cancer</option>
          <option value="Clinic Series">Sex Education</option>
        </select> */}
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
                : "border "
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleNavigate(post)}
            className="bg-gradient-to-l  p-2 rounded-lg cursor-pointer"
          >
            <img
              src={post.imageUrl} // Use the first image
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">
                #{post.category}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.descriptionText, 20)}<span className="text-white">{" "}read more</span> </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">by {post.author}</span>
              </div>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allposts;