// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Gallery from './Components/Gallery';
import Order from './Components/Order';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './auth/Login';
import Register from './auth/Register';
import Footer from './Components/Footer';

import { AuthProvider } from './auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🔐 Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" replace />;
};

// 🌐 Public route wrapper (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <div className="min-h-screen bg-white">
          <Routes>
            {/* 🔐 Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              }
            />

            {/* 🌐 Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 🧑‍💻 Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* ⚠️ Catch-all 404 Page */}
            <Route path="*" element={<h2 className="text-center text-red-500 mt-10">404 - Page Not Found</h2>} />
          </Routes>
        </div>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
}

export default App;
