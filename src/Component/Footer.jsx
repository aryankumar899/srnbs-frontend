import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../assets/srnbs_logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white pt-10 pb-6 px-6 md:px-20 mt-80">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-sky-700 pb-8">
        {/* Branding */}
        <div>
          <img src={logo} alt="SRNBS Services Foundation" className="mb-4" />
          <p className="text-sm text-gray-300">
            Building futures through skill development and student health. We aim to empower every learner with confidence and capability.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-green-400">Home</a></li>
            <li><a href="#" className="hover:text-green-400">Services</a></li>
            <li><a href="#" className="hover:text-green-400">Apply</a></li>
            <li><a href="#" className="hover:text-green-400">About Us</a></li>
            <li><a href="#" className="hover:text-green-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-300 mb-2">📞 +91-1234567890</p>
          <p className="text-sm text-gray-300 mb-2">✉️ info@skillhealth.org</p>
          <p className="text-sm text-gray-300">🏢 Ranchi, Jharkhand, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl text-white">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, index) => (
              <a key={index} href="#" className="hover:text-green-400 transition-all">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-400 pt-6">
        © {new Date().getFullYear()} SRNBS Services Foundation Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
