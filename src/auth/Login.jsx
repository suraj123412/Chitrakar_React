import React, { useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await AxiosInstance.post('api/login/', formData); // ✅ use custom AxiosInstance
      localStorage.setItem('accessToken', response.data.access);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check username and password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded text-gray-700">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-3 p-2 mt-10 border"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
          required
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>

      <p className="mt-4 text-sm text-center text-red-600">
        Don't have an account?{' '}
        <button className="badge text-bg-success p-2 rounded-pill">
          <Link to="/register" className="text-white underline">Register here</Link>
        </button>
      </p>
    </div>
  );
};

export default Login;
