import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Carousel fade interval={3000}>
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-full h-[70vh] object-cover"
          src="https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg"
          alt="Art 1"
        />
        <Carousel.Caption className="bottom-1/4">
          <motion.h1
            className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Capture Memories 🎨
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg text-white drop-shadow-md mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Beautiful handmade pencil & color portraits made with love.
          </motion.p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/order" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300">
              Order Now
            </Link>
          </motion.div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-full h-[60vh] object-cover"
          src="https://images.stockcake.com/public/5/a/0/5a0200a2-cc2e-4e87-826d-6206aafea232_large/cinematic-reel-art-stockcake.jpg"
          alt="Art 2"
        />
        <Carousel.Caption className="bottom-1/4">
          <motion.h1
            className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Capture Memories
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg text-white drop-shadow-md mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Custom couple, wedding & gift portraits available.
          </motion.p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/order" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300">
              Order Yours
            </Link>
          </motion.div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-full h-[70vh] object-cover"
          src="https://www.ultraimagehub.com/wallpapers/tr:flp-false,gx-0.3,gy-1,q-75,rh-3264,rw-5824,th-1080,tw-1920/1234042397831200838.jpeg"
          alt="Art 3"
        />
        <Carousel.Caption className="bottom-1/4">
          <motion.h1
            className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Unique. Personal. Timeless.
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg text-white drop-shadow-md mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every portrait is made with heart and skill.
          </motion.p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/order" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300">
              Get Started
            </Link>
          </motion.div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
