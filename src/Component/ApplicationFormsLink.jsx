import React from "react";
import banner from "../assets/application-banner.jpg";
import { useNavigate } from "react-router-dom";

// Sample login check — replace with your actual auth state (e.g., from context)
const isLoggedIn = false; // Example: useAuth().isLoggedIn

const applications = [
  {
    title: "Online Application for JJTC-2023",
  },
  {
    title: "Online Application for JTMACCE-2025",
  },
  {
    title: "Online Application for JSSCE-2024",
  },
];

const ApplicationFormsLink = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // ✅ Token check

  const handleApplyClick = () => {
    if (isLoggedIn) {
      navigate("/application-form");
    } else {
      navigate("/client-registration");
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 mt-27">
      {/* ✅ Banner */}
      <div className="w-full max-w-7xl mx-auto mb-6">
        <img
          src={banner}
          alt="Application Banner"
          className="w-full rounded-lg shadow-md object-cover aspect-[50/10]"
        />
      </div>

      {/* ✅ Form container */}
      <div className="max-w-6xl mx-auto bg-white rounded shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Application Forms (Apply)
        </h2>

        {/* ✅ Table for medium and large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border-r">S.No.</th>
                <th className="p-3 border-r">Title</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-r">{index + 1}</td>
                  <td className="p-3 border-r">{app.title}</td>
                  <td className="p-3">
                    <button
                      onClick={handleApplyClick}
                      className="inline-block w-32 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                      Apply Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Card layout for mobile screens */}
        <div className="md:hidden space-y-4">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <p className="text-gray-600 font-medium mb-2">
                <span className="font-semibold">#{index + 1}</span> –{" "}
                {app.title}
              </p>
              <button
                onClick={handleApplyClick}
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormsLink;
