import {
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { motion } from "framer-motion";
import {
  fadeIn,
  pulse,
  slideInFromTop,
  staggerContainer,
} from "../constants/animations";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true" // Check if dark mode is stored
  );

  const navigate = useNavigate();
  const location = useLocation();

  // Dark mode toggle handler

  // Effect to apply dark/light mode classes to the body
  useEffect(() => {
    const root = document.documentElement; // Target the html element
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", isDarkMode); // store preference
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    console.log("Dark mode:", !isDarkMode); // check if state updates
  };
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-purple-700/80"
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div
            onClick={handleHome}
            className="flex items-center flex-shrink-0 cursor-pointer"
          >
            <img className="h-8 w-auto mr-2" src={logo} alt="Logo" />
            <span className="text-[16px] tracking-tight">DoctorKays</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-300 hover:text-primary"
                  } pb-1`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Moon size={24} className="text-gray-300 hover:text-primary" />
              ) : (
                <Sun size={24} className="text-gray-300 hover:text-primary" />
              )}
            </button>
          </div>

          <motion.div
            variants={pulse}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center space-x-12 items-center"
          >
            <a
              href="https://consultation.doctorkays.com/"
              className="bg-gradient-to-r text-white from-purple-500 to-purple-950 py-2 px-3 rounded-full"
            >
              Book a Consultation
            </a>
          </motion.div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInFromTop}
            className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden"
          >
            <ul>
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="py-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={item.href}
                    className={`${
                      location.pathname === item.href
                        ? "border-b-2 border-primary text-primary"
                        : "text-gray-300 hover:text-primary"
                    } pb-1`}
                  >
                    {item.iconMapping} {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            {/* Dark Mode Toggle for Mobile */}
            <div className="flex space-x-4 mt-6 mb-5">
              <button onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Moon
                    size={24}
                    className="text-gray-300 hover:text-primary"
                  />
                ) : (
                  <Sun size={24} className="text-gray-300 hover:text-primary" />
                )}
              </button>
            </div>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://consultation.doctorkays.com/"
                className="rounded-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
