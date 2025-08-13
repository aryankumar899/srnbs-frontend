import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const updates = [
 { text: "Admissions open for 2025 batch", date: "July 28, 2025", link: "/admissions" },
 { text: "New Skill Development Courses launched", date: "July 25, 2025", link: "/skills" },
 { text: "Upcoming Health Checkup Camp", date: "July 22, 2025", link: "/health-camp" },
 { text: "National Seminar Registration Open", date: "July 20, 2025", link: "/seminar" },
 { text: "Internship Opportunity in Web Dev", date: "July 15, 2025", link: "/internship" },
 { text: "Workshop on AI for Beginners", date: "July 10, 2025", link: "/ai-workshop" },
 { text: "Campus Placement Drive Begins", date: "July 05, 2025", link: "/placements" },
];

const aboutContent = {
  about:
    "We are committed to empowering students with skills and health awareness for a better future. Our platform focuses on nurturing talent and promoting academic excellence.",
  mission:
    "To create a dynamic environment for skill development, education, and holistic student growth—ensuring youth are prepared for both life and career.",
  vision:
    "To become a leading educational institution that inspires innovation, leadership, and inclusive development across communities.",
};

const AboutWhatsNew = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isPaused, setIsPaused] = useState(false);

  const scrollingUpdates = [...updates, ...updates]; // for loop illusion

  return (
    // CHANGE: Adjusted grid to make "About Us" wider (3/5 of the width) and removed fixed height.
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-7xl mx-auto px-4 py-10">
      
      {/* About Section */}
      {/* CHANGE: Added motion.div for animation and md:col-span-3 for increased width */}
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 md:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#004d40]">About Us</h2>
        <div className="flex gap-6 mb-4 border-b border-gray-300">
          {["about", "mission", "vision"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium cursor-pointer transition-colors duration-300 ${
                activeTab === tab
                  ? "text-[#004d40] border-b-2 border-[#004d40]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {/* CHANGE: Added AnimatePresence and motion.p for smooth text transition between tabs */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-700 text-sm leading-relaxed"
          >
            {aboutContent[activeTab]}
          </motion.p>
        </AnimatePresence>
      </motion.div>


      {/* What's New Section */}
      {/* CHANGE: Added md:col-span-2 to fit the new grid layout */}
      <div className="bg-gradient-to-br from-sky-100 to-cyan-200 shadow-xl rounded-xl p-6 w-full md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black">📢 What's New</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="text-xs bg-white text-[#075985] px-2 py-1 rounded hover:bg-gray-100 transition duration-200"
            >
              {isPaused ? "▶ Play" : "⏸ Pause"}
            </button>
            <Link
              to="/whats-new"
              className="bg-white text-[#075985] text-xs px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="max-h-[280px] overflow-y-auto custom-scroll">
          <div className={`flex flex-col gap-4 ${isPaused ? "" : "animate-scroll-up sm:animate-none"}`}>
            {scrollingUpdates.map((update, index) => (
              <Link
                to={update.link}
                key={index}
                className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-[#e3f2fd] hover:rounded-lg transition-all duration-300"
              >
                <span className="text-xs text-black w-[90px]">{update.date}</span>
                <span className="text-sm text-black font-medium">{update.text}</span>
                <span className="ml-auto text-green-800 text-xs font-bold">🆕</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutWhatsNew;