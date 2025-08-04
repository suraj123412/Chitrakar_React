// src/App.jsx
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Gallery from './Components/Gallery';
import Order from './Components/Order';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './auth/Login';
import Register from './auth/Register';


import { AuthProvider } from './auth/AuthContext';
import Footer from './Components/Footer';




function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
         
        </Routes>
      </div>
      <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
