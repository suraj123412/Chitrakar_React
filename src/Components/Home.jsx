
import { Link } from 'react-router-dom';
import Hero from './Hero';
import FevPortrait from './FevPortrait';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import GalleryButton from './GalleryButton';

const Home = () => {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-gradient-to-r from-pink-100 to-blue-100 hero">
     <Hero/>
      </section>

      {/* MOST LOVED SKETCHES */}
      <section className=" text-center pt-9 bg-gray-50">
       
        <div className="row justify-content-center">
          <div className="col-md-10 d-flex flex-wrap justify-center gap-4">
            <FevPortrait/>
          </div>
        </div>
      </section>
      
      <section className='pt-9'>
        <GalleryButton />
      </section>

      {/* CUSTOMER COMMENTS */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-automd:grid-cols-1 gap-9 flex">
          <CommentList/>
          <CommentForm/>
        </div>
      </section>

    </div>
  );
};

export default Home;
