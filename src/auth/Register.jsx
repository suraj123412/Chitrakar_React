import React, { useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await AxiosInstance.post('/api/register/', formData); // ✅ AxiosInstance used

      if (response.status === 201 || response.status === 200) {
        setSuccess('Registration successful!');
        setFormData({ username: '', password: '' });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const apiError = err.response.data;
        const msg = apiError.username?.[0] || apiError.password?.[0] || "Registration failed.";
        setError(msg);
      } else {
        setError('Registration failed. Server not responding.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border mt-10 text-gray-800"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border text-gray-800"
          required
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>

      <p className="mt-4 text-sm text-center text-blue-500">
        Already have an account?{' '}
        <button className="badge text-bg-primary p-2 rounded-pill">
          <Link to="/login" className="text-white underline">
            Login here
          </Link>
        </button>
      </p>
    </div>
  );
};

export default Register;
