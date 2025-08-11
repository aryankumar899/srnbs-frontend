import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import managingDirectorImage from "../assets/managingDirector.jpg";
import Director from "../assets/director.jpg";
import Chairman from "../assets/chairman.jpg";
import Hr from "../assets/hr.jpg";
import AgencyHead from "../assets/agencyHead.jpg";
import SkillHead from "../assets/skillHead.jpg";
import DirectorHead from "../assets/diretorOperation.jpg"

const owners = [
  {
    name: "Sajal Bhattacharjee",
    role: "Chairman",
    image: Chairman,
  },
  {
    name: "RN Pandit",
    role: "Managing Director(MD)",
    image: managingDirectorImage,
  },
  {
    name: "Swarup Pandey",
    role: "Director (PRA)",
    image: Director,
  },
  {
    name: "Pragati Verma",
    role: "HR Manager",
    image: Hr,
  },
  {
    name: "Suman Kumar",
    role: "Agency head",
    image: AgencyHead,
  },
  {
    name: "Nitin Gautam",
    role: "State Skill Operation Head",
    image: SkillHead,
  },
  {
    name: "Ranjit Kumar Mandal",
    role: "Director Operation",
    image: DirectorHead,
  },
];

const OwnerSection = () => {
  return (
    <motion.section
      className="bg-gray-100 py-16 px-6 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-bold text-sky-900 mb-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Founders
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Visionaries behind the mission
        </motion.p>
      </div>

      <Swiper
        loop={true}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-7xl mx-auto"
      >
        {owners.map((owner, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="w-full flex flex-col items-center bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-44 h-44 rounded-full bg-white shadow-lg border-4 border-green-500 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-sky-900 text-center">
                {owner.name}
              </h3>
              <p className="text-green-700 font-medium text-center">
                {owner.role}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default OwnerSection;
