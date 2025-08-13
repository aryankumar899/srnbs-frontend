// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import herosection1 from "../Assets/hersection1.jpg";
// import herosection2 from "../Assets/hersection2.jpg";
// import herosection3 from "../Assets/hersection3.jpg";

// const images = [herosection1, herosection2, herosection3];

// const variants = {
//   enter: (direction) => ({
//     x: direction > 0 ? 300 : -300,
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction) => ({
//     x: direction < 0 ? 300 : -300,
//     opacity: 0,
//   }),
// };

// const HeroSection = () => {
//   const [[current, direction], setCurrent] = useState([0, 0]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent(([prevIndex]) => [
//         (prevIndex + 1) % images.length,
//         1,
//       ]);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => {
//     setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
//   };

//   const prevSlide = () => {
//     setCurrent(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
//   };

//   const goToSlide = (index) => {
//     setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
//   };

//   return (
//     <div className="relative w-full h-[70vh] overflow-hidden bg-gray-100 mt-25">
//       <AnimatePresence initial={false} custom={direction}>
//         <motion.img
//           key={current}
//           src={images[current]}
//           alt="Hero Slide"
//           custom={direction}
//           variants={variants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           className="w-full h-full object-cover relative z-10 shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
//         />
//       </AnimatePresence>

//       {/* Overlay Text */}
//       {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center text-white px-4 z-10">
//         <motion.h1
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-4xl md:text-5xl font-bold text-sky-200"
//         >
//           Empowering Skills, Enhancing Health
//         </motion.h1>
//         <p className="mt-4 max-w-2xl text-sky-100 font-bold">
//           Join us to gain valuable skills and improve healthcare knowledge for a better future.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
//         >
//           Get Started
//         </motion.button>
//       </div> */}

//       {/* Navigation Arrows */}
//       {/* <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
//       >
//         <FaArrowLeft />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
//       >
//         <FaArrowRight />
//       </button> */}

//       {/* Dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full ${
//               index === current ? "bg-white" : "bg-gray-400"
//             } transition duration-300`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import herosection1 from "../Assets/hersection1.jpg";
import herosection2 from "../Assets/hersection2.jpg";
import herosection3 from "../Assets/hersection3.jpg";


const images = [
  herosection1,
  herosection2,
  herosection3,
];


const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const HeroSection = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(([prevIndex]) => [
        (prevIndex + 1) % images.length,
        1,
      ]);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
  };

  const prevSlide = () => {
    setCurrent(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
  };

  const goToSlide = (index) => {
    setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-100 mt-24">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt="Hero Slide"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full object-cover relative z-10 shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
        />
      </AnimatePresence>

      {/* Overlay Text */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-sky-200"
        >
          Empowering Skills, Enhancing Health
        </motion.h1>
        <p className="mt-4 max-w-2xl text-sky-100 font-bold">
          Join us to gain valuable skills and improve healthcare knowledge for a better future.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
        >
          Get Started
        </motion.button>
      </div> */}

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
      >
        <FaArrowRight />
      </button> */}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;



