import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  RefreshCw,
  ShieldCheck,
  Truck,
  Star,
  Heart,
  Search,
} from "lucide-react";
import { client } from "../../../lib/client";
import Footer from "../Footer";

const Shopcards = ({ isDarkMode }) => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [shopItems, setShopItems] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchShopItems = async () => {
      const query = `*[_type == "shop"]{
        _id,
        title,
        product,
        "imageUrl": icon[0].asset->url,
        "imageCount": count(icon),
        price,
        reviews,
        rating,
        "descriptionText": coalesce(description[0].children[0].text, "")
      }`;

      try {
        const data = await client.fetch(query);
        setShopItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shop items:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  const categories = [
    "All",
    "Pharmacy Delivery",
    "Medical Equipments",
    "Savings & Essentials",
    "Personal care",
  ];

  const filterItems = () => {
    if (filter === "All") return shopItems;
    return shopItems.filter((item) =>
      item.product.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredItems = filterItems().filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // const isLightMode = mode === 'light';

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  if (error)
    return <p>Error loading shop items it is from our side, please reload.</p>;

  return (
    <div className="max-w-7xl mx-auto py-6 p-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold  mb-4">Get Inspired</h1>
        <p className="text-lg ">
          Whether you're looking for innovative medical devices or everyday
          health solutions, our shop offers quality, convenience, and care in
          every product.
        </p>
      </div>

      {/* Features Section */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-10 `}
      >
        {[
          {
            title: "Certified",
            icon: BadgeCheck,
            content: "Available certificates of authenticity",
          },
          {
            title: "Secure",
            icon: ShieldCheck,
            content: "Certified marketplace since 2024",
          },
          {
            title: "Shipping",
            icon: Truck,
            content: "Free, fast, and reliable worldwide",
          },
          {
            title: "Transparent",
            icon: RefreshCw,
            content: "Hassle-free return policy",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className={`flex flex-col border items-center bg-neutral-7 00 rounded-lg p-4 text-center`}
          >
            <feature.icon className="text-purple-500 w-8 h-8 mb-2" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.content}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between mt-10 mb-6 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto flex-1 border border-gray-700 bg-inherit rounded-3xl px-4 py-2 placeholder-gray-400"
        />

        {/* search filter */}
        {/* <select
          className="border border-gray-700 rounded-lg px-4 py-2 bg-inherit"
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
      </div>

      {/* Filter Tags */}
      {/* <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === category
                ? "bg-gradient-to-l from-purple-700 to-purple-400 text-white"
                : "bg-inherit border text-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

      <h1 className="text-2xl font-bold mb-4">Available Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((product) => (
          <div
            key={product._id}
            className="p-2 rounded-md overflow-hidden cursor-pointer
                 transition-transform transform hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-40 sm:h-48 object-contain rounded-md"
              onClick={() => handleProductClick(product)}
            />

            <div className="mt-3">
              <h3
                className="sm:text-lg font-semibold "
                onClick={() => handleProductClick(product)}
              >
                {product.title}
              </h3>
              <p className="text-sm mt-1">${product.price}</p>

              <div className="flex items-center gap-1 mt-2">
                {renderStars(product.rating)}
                {/* <span className="text-xs ">
                  ({product.reviews} reviews)
                </span> */}
              </div>

              <button
                onClick={() => toggleFavorite(product._id)}
                className="mt-2"
              >
                {favorites.includes(product._id) ? (
                  <Heart
                    fill="currentColor"
                    className="w-5 h-5 text-purple-800"
                  />
                ) : (
                  <Heart className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="p-2 flex justify-end">
              <span className="bg-gray-200 text-gray-600 px-2 py-1 text-xs rounded-full">
                +{product.imageCount || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Shopcards;
