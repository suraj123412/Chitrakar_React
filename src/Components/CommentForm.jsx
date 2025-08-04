import { useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const CommentForm = () => {
  const [formData, setFormData] = useState({ name: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Now using AxiosInstance
      await AxiosInstance.post('api/portrait/comments/', formData);
      setFormData({ name: '', comment: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Comment submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <h3 className="text-2xl md:text-3xl font-extrabold text-center text-gray-700 pt-10 mb-20">
        Leave a Comment
      </h3>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md rounded-xl p-7 space-y-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Comment
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.p
              className="text-green-600 text-center mt-3 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              ✅ Thanks! Your comment was submitted.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};

export default CommentForm;
