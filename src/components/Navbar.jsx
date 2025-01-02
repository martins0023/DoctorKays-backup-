import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { motion } from "framer-motion";
import { containerVariants, pulse } from "../constants/animations";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-purple-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div
            onClick={handleHome}
            className="flex items-center flex-shrink-0 cursor-pointer"
          >
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
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
          <motion.div variants={pulse} initial="hidden"
          animate="visible" className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-purple-500 to-purple-950 py-2 px-3 rounded-full"
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
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
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
            <div className="flex space-x-6 mt-2">
              <a
                href="#"
                className="rounded-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
