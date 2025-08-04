import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AxiosInstance from '../api/AxiosInstance';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    AxiosInstance.get('/api/gallery/artwork/')
      .then(response => {
        setGalleryItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching gallery:', error);
      });
  }, []);

  return (
    <div className="relative p-20">
      {/* Gallery Content */}
      <div className={`container mx-auto px-4 py-10 transition-all duration-500 ${selectedItem ? 'blur-sm pointer-events-none' : ''}`}>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 pt-10">
          🎨 Our Art Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleryItems.map(item => (
            <motion.div
              key={item.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedItem(item)}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover p-3 transition-transform duration-500"
                whileHover={{ scale: 1.1 }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.size} | {item.category}</p>
                {item.description && (
                  <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl p-4 max-w-3xl w-[90%] relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[70vh] object-contain rounded-md"
              />
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{selectedItem.title}</h2>
                <p className="text-sm text-gray-500">{selectedItem.size} | {selectedItem.category}</p>
                {selectedItem.description && (
                  <p className="mt-2 text-gray-700 text-sm">{selectedItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
