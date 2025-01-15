import React from "react";
import { clinic, clinic1, clinic3, clinicseries1 } from "../assets";
import { clinicSeries } from "../constants";

const Shopcards = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-400 mb-4">
          Get Inspired
        </h1>
        <p className="text-lg text-gray-300">
          Browsing for your next long-haul trip, everyday journey, or just fancy
          a look at what’s new? From community favorites to about-to-sell-out
          items, see them all here.
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-start md:justify-between items-center">
        <button className="bg-white shadow-md text-gray-600 h-[50px] px-4 rounded-full text-sm flex justify-center items-start flex-col">
          <span>Category</span>
          <span className="text-gray-400">All Categories</span>
        </button>
        <button className="bg-white shadow-md text-gray-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
          <span>Color</span>
          <span className="text-gray-400">All Colors</span>
        </button>
        <button className="bg-white shadow-md text-gray-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
          <span>Features</span>
          <span className="text-gray-400">All Features</span>
        </button>
        <button className="bg-white shadow-md text-gray-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
          <span>Price</span>
          <span className="text-gray-400">€0 - €1000</span>
        </button>
        <button className="bg-white shadow-md text-gray-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
          <span>Sort</span>
          <span className="text-gray-400">New In</span>
        </button>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          {
            id: 1,
            name: "Shibuya Totepack",
            price: "€140.00",
            image: clinicseries1,
            likes: 4,
          },
          {
            id: 2,
            name: "SoFo Backpack City",
            price: "€280.00",
            image: clinic3,
            likes: 1,
          },
          {
            id: 3,
            name: "Gion Backpack Pro",
            price: "€140.00",
            image: clinic1,
            likes: 3,
          },
          {
            id: 4,
            name: "SoFo Rolltop Backpack X",
            price: "€170.00",
            image: clinic,
            likes: 2,
          },
        ].map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
            <div className="p-2 flex justify-end">
              <span className="bg-gray-200 text-gray-600 px-2 py-1 text-xs rounded-full">
                +{product.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopcards;
