import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/srnbs_logo.png";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("username"));

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY);
      setShowTopBar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Auto logout after 30 minutes
  useEffect(() => {
    if (isLoggedIn) {
      const now = Date.now();
      const THIRTY_MINUTES = 30 * 60 * 1000;

      let loginTime = localStorage.getItem("loginTime");
      if (!loginTime) {
        localStorage.setItem("loginTime", now.toString());
        loginTime = now.toString();
      }

      const timeElapsed = now - parseInt(loginTime, 10);
      if (timeElapsed >= THIRTY_MINUTES) {
        handleLogout();
        return;
      }

      const remainingTime = THIRTY_MINUTES - timeElapsed;
      const timer = setTimeout(() => {
        handleLogout();
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Apply Now", path: "/apply" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    toast.info("Logout Successfully", {
      position: "top-center ",
      autoClose: 4000,
    });
  };

  return (
    <div className="w-full z-50 fixed top-0 left-0">
      {/* Top Contact Bar */}
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="bg-sky-800 text-white text-sm px-6 py-2 flex justify-between items-center"
          >
            <div>📞 +91-1234567890 | ✉️ info@skillhealth.org</div>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="hover:text-green-300"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.div
        animate={{
          padding: isScrollingDown ? "0.75rem 1.5rem" : "1rem 1.5rem",
          boxShadow: isScrollingDown
            ? "0 2px 10px rgba(0,0,0,0.1)"
            : "0 4px 16px rgba(0,0,0,0.15)",
          backgroundColor: "white",
        }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center relative"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center"
        >
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-[140px] h-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-sky-900 font-medium text-md items-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                to={link.path}
                className="hover:text-green-700 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="hover:text-green-700 transition duration-200 cursor-pointer"
              >
                <FaUserCircle className="inline-block mr-1 h-20 w-6 cursor-pointer" />
                {localStorage.getItem("username") || "Profile"}
              </button>
              {showProfileMenu && (
                <div className="absolute top-15 right-0 bg-white border rounded shadow-lg z-50 w-40">
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Edit Details
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 w-full bg-white/95 shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden z-50"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-sky-900 font-medium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {isLoggedIn && (
                <div className="text-center space-y-2">
                  <Link
                    to="/edit-profile"
                    className="text-sky-900 block"
                    onClick={() => setMenuOpen(false)}
                  >
                    Edit Details
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;
