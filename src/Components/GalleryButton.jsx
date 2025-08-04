import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryButton = () => {
  const location = useLocation();
  const isActive = location.pathname === '/gallery';

  return (
    <div className="w-full flex justify-center py-10 px-4 bg-gradient-to-br from-purple-100 via-blue-200 to-pink-100">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-block"
        >
          <Link
            to="/gallery"
            className={`relative flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full transition duration-300 transform
              ${isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white text-gray-700 border-2 border-blue-500 hover:scale-105 hover:shadow-lg hover:bg-blue-600 no-underline hover:text-blue-600'}
            `}
          >
            🎨 Visit Gallery

            {/* Active Badge */}
            {isActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
                className="absolute -top-2 -right-3 bg-green-500 text text-xs px-2 py-0.5 rounded-full animate-pulse shadow"
              >
                Active
              </motion.span>
            )}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GalleryButton;
