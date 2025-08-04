import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5>Chitrakar 🎨</h5>
            <p>Handmade portraits crafted with love & detail. A perfect gift for your memories!</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="hover:text-green-400">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-light" to="/">Home</Link></li>
              <li><Link className="text-light" to="/gallery">Gallery</Link></li>
              <li><Link className="text-light" to="/order">Order</Link></li>
              <li><Link className="text-light" to="/about">About Artist</Link></li>
              <li><Link className="text-light" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="hover:text-yellow-300">Follow Us</h5>
            <a href="https://www.instagram.com/imsuraj_mahajan/" className="text-light me-3 hover:text-red-600"><i class="bi bi-instagram  hover:text-red-600"></i></a>
            <a href="#" className="text-light me-3"><i class="bi bi-facebook hover:text-blue-400"></i></a>
            <a href="https://wa.me/919876543210" className="text-light me-3"><i class="bi bi-whatsapp hover:text-green-400 shadow-green-400"></i></a>
          </div>

        </div>

        <hr className="border-light" />
        <p className="mb-0">© {new Date().getFullYear()} Chitrakar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
