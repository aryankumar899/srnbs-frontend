import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; // Common icon for all links

const links = [
  { name: "Application Forms (Apply)", href: "/apply" },
  { name: "Admit Card", href: "/admit-card" },
  { name: "Answer Key", href: "/answer-key" },
  { name: "Result", href: "/result" },
  { name: "Score Card", href: "/score-card" },
  { name: "Answer Booklet", href: "/answer-booklet" },
  { name: "Online Representations", href: "/representations" },
];

const ImportantLinksWithQuote = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10 bg-gray-100">
      {/* Important Links Section */}
      <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-green-700">
        <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-800" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 1.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L3 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-5h2v5a1 1 0 001 1h3a2 2 0 002-2v-7.586l1.293 1.293a1 1 0 001.414-1.414l-9-9z" />
          </svg>
          Important Links
        </h2>
        <ul className="space-y-3 text-gray-700 font-medium">
          {links.map(({ name, href }, idx) => (
            <li key={idx}>
              <a
                href={href}
                className="flex items-center gap-3 hover:text-green-800 transition-colors duration-200"
              >
                <FaExternalLinkAlt className="text-green-600" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Quote Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-orange-600">
        <img
          src="https://happenings.lpu.in/wp-content/uploads/2019/03/Swami-Vivekananda.jpg"
          alt="Swami Vivekananda"
          className="w-28 h-28 object-cover rounded-full border-4 border-orange-500 mb-4"
        />
        <p className="text-lg italic text-gray-700 mb-2">
          “Arise, awake, and stop not till the goal is reached.”
        </p>
        <span className="font-semibold text-orange-700">
          — Swami Vivekananda
        </span>
      </div>
    </div>
  );
};

export default ImportantLinksWithQuote;
