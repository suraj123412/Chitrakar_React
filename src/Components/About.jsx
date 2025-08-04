import React from 'react';
import { motion } from 'framer-motion';
import heroBg from './image/herojpg'
import { Link } from 'react-router-dom'; 
import suraj from "./image/suraj.jpg"

const About = () => {
  return (
    <div className="mt-16 pt-10">
      {/* Hero Section */}
      <div
        className="bg-scroll bg-center h-[60vh] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded shadow-lg text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Chitrakar</h1>
          <p className="mt-2 text-lg">Bringing Emotions to Life Through Portraits</p>
        </div>
      </div>

      {/* My Story */}
      <div className="container my-5">
        <div className="row align-items-center pl-10">
          <div className="col-md-6 p-4">
            <motion.h2
              className="text-3xl font-semibold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              My Art Journey
            </motion.h2>
            <p className="text-gray-700">
              Hi! I’m a passionate portrait artist who started sketching during college. What began as a hobby soon turned into a full-time love. Now I create custom pencil and color portraits that people gift and treasure forever.
            </p>
          </div>
          <div className="col-md-6 pl-10">
            <img
              src={suraj}
              alt="Art journey"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* What I Offer */}
      <div className="bg-gray-100 py-5">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mb-4 text-red-500">What I Offer</h2>
          <div className="row text-center text-gray-700">
            {[
              { title: "Pencil Sketch", icon: "✏️" },
              { title: "Color Portrait", icon: "🎨" },
              { title: "Couple Sketch", icon: "💑" },
              { title: "Wedding Gift Portrait", icon: "💍" },
            ].map((item, i) => (
              <div className="col-md-3 col-6 mb-4" key={i}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white p-4 rounded shadow"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h5 className="font-semibold">{item.title}</h5>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center my-10">
  <div className="flex justify-center gap-4 pb-10">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to="/order"
        className="btn btn-primary text-white text-lg px-5 py-2 rounded shadow"
      >
        🛒 Order Now
      </Link>
    </motion.div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to="/contact"
        className="btn btn-success text-lg px-5 py-2 rounded shadow"
      >
        📞 Contact
      </Link>
    </motion.div>
  </div>
</div>
    </div>
  );
};

export default About;
