import { useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await AxiosInstance.get('api/portrait/comments/');
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchComments();
  }, []);

  const visibleComments = comments.slice(startIndex, startIndex + visibleCount);

  const handleScrollDown = () => {
    if (startIndex + visibleCount < comments.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleScrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h3 className="text-2xl md:text-3xl font-extrabold text-center text-gray-700 mb-8">
        What Our Customers Say
      </h3>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={handleScrollUp}
          className={`p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition ${
            startIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
          }`}
          disabled={startIndex === 0}
        >
          <ChevronUp className="w-6 h-6 text-blue-700" />
        </button>

        <ul className="w-full space-y-4">
          <AnimatePresence mode="popLayout">
            {visibleComments.map((comment) => (
              <motion.li
                key={comment.id}
                className="bg-white border border-gray-200 shadow-md rounded-xl px-4 py-3 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="absolute top-2 right-5 text-blue-100 text-4xl font-serif opacity-20 select-none">
                  “
                </div>
                <p className="text-gray-800 text-sm md:text-base italic mb-3 leading-relaxed">
                  {comment.comment}
                </p>
                <p className="text-sm font-semibold text-blue-600 text-right">
                  — {comment.name}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <button
          onClick={handleScrollDown}
          className={`p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition ${
            startIndex + visibleCount >= comments.length ? 'opacity-30 cursor-not-allowed' : ''
          }`}
          disabled={startIndex + visibleCount >= comments.length}
        >
          <ChevronDown className="w-6 h-6 text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default CommentList;
