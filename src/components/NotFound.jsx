import React from "react";
import Navbar from "./Navbar";
import { notfound1, notfound2 } from "../assets";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto md:pt-20 px-6">
        <div className="flex flex-col items-center justify-center mt-10 h-screen p-4">
          <h1 className="text-4xl font-bold text-center text-gray-300">
            404 - Page Not Found
          </h1>
          <p className="text-gray-400 text-[18px] text-center mt-4">
            Oops! The page you are looking for does not exist, It's from our
            end. We're working on it.
          </p>
          <img
            src={notfound2}
            className="object-cover w-[500px] h-[500px]"
            alt="notfound"
          />
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primarydark transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
