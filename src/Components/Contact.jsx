import React from "react";
import { FaEnvelope, FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
      >
        Get in Touch
      </motion.h1>

      <p className="text-gray-600 text-center max-w-xl mb-10">
        Have a question, custom portrait request, or collaboration idea? Reach out via any platform below!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {/* Email */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <FaEnvelope className="text-red-500 text-3xl" />
          <div>
            <h3 className="font-semibold text-gray-800">Email</h3>
            <a href="mailto:yourname@example.com" className="text-blue-500  no-underline hover:underline">
              surajbuss08@gmail.com
            </a>
          </div>
        </motion.div>

        {/* WhatsApp */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <FaWhatsapp className="text-green-500 text-3xl" />
          <div>
            <h3 className="font-semibold text-gray-800">WhatsApp</h3>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-blue-500  no-underline hover:underline">
              +91 8605854923
            </a>
          </div>
        </motion.div>

        {/* Instagram */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <FaInstagram className="text-pink-600 text-3xl" />
          <div>
            <h3 className="font-semibold text-gray-800">Instagram</h3>
            <a href="https://www.instagram.com/imsuraj_mahajan/" target="_blank" rel="noopener noreferrer" className="text-blue-500  no-underline hover:underline">
              @imsuraj_mahajan
            </a>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <FaMapMarkerAlt className="text-purple-500 text-3xl" />
          <div>
            <h3 className="font-semibold text-gray-800">Location</h3>
            <p className="text-gray-700">Maharashtra, India (Online Orders)</p>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
   <div className="flex justify-center gap-4 flex-wrap pt-10">
      <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to="/gallery"
        className="no-underline bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700 transition duration-300"
      >
        🖼️ View Gallery
      </Link>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to="/order"
        className="no-underline bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300"
      >
        🎨 Order Now
      </Link>
    </motion.div>
  </div>
    </div>
  );
};

export default Contact;
