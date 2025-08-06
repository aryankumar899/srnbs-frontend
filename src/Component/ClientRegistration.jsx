import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientRegistration = () => {
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { username, password: registeredPassword } = location.state || {};

  // Generate random captcha
  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCaptcha(random);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

 const handleLogin = async () => {
  if (!registrationNo || !password || !captcha) {
    setError("All fields are required before logging in.");
    return;
  }

  if (captcha !== generatedCaptcha) {
    setError("Captcha does not match.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: registrationNo,
        password
      })
    });

    const data = await response.json();
    console.log("Full response data:", data); // ✅ Inspect this

    if (!response.ok) {
      setError(data.message || "Invalid username or password.");
      return;
    }

    setError("");
    toast.success("Login Successful! Redirecting...");

    // Clear old values
    localStorage.clear();

    // ✅ Save token
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // ✅ Save username (handle different API response structures)
    if (data.user?.username) {
      localStorage.setItem("username", data.user.username);
    } else if (data.username) {
      localStorage.setItem("username", data.username);
    } else {
      console.warn("⚠️ Username not found in response");
    }

    localStorage.setItem("isAuthenticated", "true");
    console.log(localStorage.getItem("username"));        // should show: 'princekumar2781'
console.log(localStorage.getItem("token"));           // should show your JWT
console.log(localStorage.getItem("isAuthenticated")); // should show: 'true'


    // Debugging output
    console.log("🧠 localStorage:", localStorage);

    // Redirect
    setTimeout(() => {
      navigate("/application-form");
    }, 2000);
  } catch (err) {
    console.error("Login error:", err);
    setError("Server error. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-8 px-4 mt-25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />

      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-center text-sky-800 mt-10">
          SRNBS Services Foundation
        </h1>
      </motion.div>

      {/* Container */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {/* Left Section */}
        <motion.div
          className="bg-white rounded-xl shadow-md border p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/new-registration"
            className="bg-red-600 text-white w-full py-2 rounded font-semibold mb-4 block text-center"
          >
            New Registration
          </Link>

          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded mb-4">
            The payment page is available. Kindly submit the registration fee to complete your registration. PwBD candidates are exempted from the fee, but all candidates must complete the final submission.
          </div>

          <div className="bg-gray-200 text-gray-900 p-3 rounded font-semibold mb-3">NOTICE</div>

          <div className="text-sm space-y-2">
            <div>
              <strong>Important Notice:</strong> Advertisement Number - 22 / 2023 Jharkhand Junior Translator Competitive Examination - 2023 (Regular)
              <a href="#" className="text-red-600 font-semibold underline ml-1">PDF</a>
            </div>
            <div>
              Brochure JJTC-2023 (Regular vacancy) - Jharkhand Junior Translator Competitive Examination
              <a href="#" className="text-red-600 font-semibold underline ml-1">PDF</a>
            </div>
          </div>
        </motion.div>

        {/* Right Section (Login Form) */}
        <motion.div
          className="bg-white border rounded-xl shadow-md p-6 relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-xl font-bold text-sky-900 mb-4">User Login</h2>

          {username && registeredPassword && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-xl mb-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1">🎉 Registration Successful!</h2>
                  <p className="mb-1">Here are your login credentials:</p>
                  <p className="mt-2">
                    <span className="font-medium">👤 Username:</span>{" "}
                    <span className="font-bold text-blue-800">{username}</span>
                  </p>
                  <p>
                    <span className="font-medium">🔐 Password:</span>{" "}
                    <span className="font-bold text-red-700">{registeredPassword}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-3">
                    ⚠️ Please save these credentials. This is the only time they will be shown.
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.navigator.clipboard.writeText(
                      `Username: ${username}, Password: ${registeredPassword}`
                    )
                  }
                  className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold py-2 px-4 rounded transition-all duration-300"
                >
                  📋 Copy
                </button>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                className="w-full px-3 py-2 border rounded shadow-sm"
                placeholder="Enter Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded shadow-sm"
                placeholder="Enter Password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Captcha <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm"
                  placeholder="Enter Captcha"
                />
                <div className="bg-gray-200 px-4 py-2 rounded text-center font-mono font-semibold text-blue-900 shadow-sm select-none">
                  {generatedCaptcha}
                </div>
                <button
                  onClick={generateCaptcha}
                  className="text-sm text-blue-600 hover:underline"
                >
                  🔁 Refresh
                </button>
              </div>
            </div>

            {/* Loader Button */}
            <button
              className={`w-full flex justify-center items-center gap-2 bg-sky-800 text-white font-semibold py-2 rounded transition duration-300 ${
                isLoading ? "cursor-not-allowed opacity-70" : "hover:bg-sky-900"
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ClientRegistration;
