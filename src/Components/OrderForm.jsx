import React, { useState, useEffect } from 'react';
import AxiosInstance from '../api/AxiosInstance';

const pricing = {
  pencil: { A4: 599, A3: 799, A2: 999 },
  color: { A4: 799, A3: 1199, A2: 1499 },
  pet: { A4: 799, A3: 1199, A2: 1499 },
};

const OrderForm = ({ fetchOrders, editOrder, setEditOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    portrait_type: 'pencil',
    size: 'A4',
    image: null,
    description: '',
  });

  useEffect(() => {
    if (editOrder) {
      setFormData({
        name: editOrder.name || '',
        mobile: editOrder.mobile || '',
        portrait_type: editOrder.portrait_type || 'pencil',
        size: editOrder.size || 'A4',
        image: null, // don't prefill file input
        description: editOrder.description || '',
      });
    }
  }, [editOrder]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getPrice = () => {
    const { portrait_type, size } = formData;
    return pricing[portrait_type]?.[size] || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('Please login first');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (editOrder) {
        await AxiosInstance.put(`/api/order/users/${editOrder.id}/`, data, config);
        setEditOrder(null);
      } else {
        await AxiosInstance.post(`/api/order/users/`, data, config);
      }

      setFormData({
        name: '',
        mobile: '',
        portrait_type: 'pencil',
        size: 'A4',
        image: null,
        description: '',
      });

      fetchOrders();
    } catch (error) {
      console.error('Order submit error:', error);
      alert('Something went wrong. Please check your form or login.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-45">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        pattern="[0-9]{10}"
        required
      />

      <select
        name="portrait_type"
        value={formData.portrait_type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="pencil">Pencil Sketch</option>
        <option value="color">Color Portrait</option>
        <option value="pet">Pet Portrait</option>
      </select>

      <select
        name="size"
        value={formData.size}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="A4">A4</option>
        <option value="A3">A3</option>
        <option value="A2">A2</option>
      </select>

      <p className="text-green-700 font-semibold">
        Price per face: ₹{getPrice()}
      </p>

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full"
        accept="image/*"
        required={!editOrder}
      />

      <textarea
        name="description"
        placeholder="Describe the portrait..."
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        {editOrder ? 'Update Order' : 'Place Order'}
      </button>
    </form>
  );
};

export default OrderForm;
