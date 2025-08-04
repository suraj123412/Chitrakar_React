import React, { useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const FevPortrait = () => {
  const [portraits, setPortraits] = useState([]);
  const [selectedPortrait, setSelectedPortrait] = useState(null);

  useEffect(() => {
    AxiosInstance.get('/api/portrait/portrait/featured/') // ✅ Relative URL with AxiosInstance
      .then(res => setPortraits(res.data))
      .catch(err => console.error("Error fetching featured portraits", err));
  }, []);

  return (
    <div className="relative">
      {/* Main Section */}
      <div className="py-12 px-4 bg-[#fefefe]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
          ✨ Most Loved Sketches
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-2">
          {portraits.map(portrait => (
            <motion.div
              key={portrait.id}
              className="rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPortrait(portrait)}
            >
              <motion.img
                src={portrait.image}
                alt={portrait.title}
                className="w-full h-60 object-cover p-3 transition-transform duration-500 ease-in-out"
                whileHover={{ scale: 1.1 }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {portrait.title}
                </h3>
                <p className="text-sm text-gray-600">Size: {portrait.size}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Image Modal */}
      <AnimatePresence>
        {selectedPortrait && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-3xl w-full mx-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedPortrait.image}
                alt={selectedPortrait.title}
                className="w-full max-h-[90vh] object-contain rounded-xl border-4 border-white shadow-2xl"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPortrait(null)}
                className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md hover:scale-110 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FevPortrait;
