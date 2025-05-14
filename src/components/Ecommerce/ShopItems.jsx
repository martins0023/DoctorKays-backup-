import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Star, Heart } from "lucide-react";
import { client } from "../../../lib/client";

/**
 * ShopItems component
 * @param {object} props
 * @param {number} [props.limit] - maximum number of items to display
 * @param {boolean} [props.horizontal] - if true, render items in a horizontal scroll
 */

const ShopItems = ({ limit, horizontal }) => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [shopItems, setShopItems] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`;
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // apply limit if provided
  const displayed =
    typeof limit === "number" ? filteredItems.slice(0, limit) : filteredItems;

  // container classes: horizontal or vertical
  const containerClasses = horizontal
    ? "flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2"
    : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

  // card wrapper classes when horizontal to prevent shrink
  const cardWrapperClasses = horizontal ? "flex-shrink-0 w-60" : "";

  return (
    <div className={containerClasses}>
      {displayed.map((product) => (
        <div
          key={product._id}
          className={`${cardWrapperClasses} p-2 rounded-md
                     cursor-pointer transition-transform transform hover:scale-105`}
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
  );
};

ShopItems.propTypes = {
  limit: PropTypes.number,
  horizontal: PropTypes.bool,
};

ShopItems.defaultProps = {
  limit: undefined,
  horizontal: false,
};

export default ShopItems;
