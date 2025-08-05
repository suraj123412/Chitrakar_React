import React, { useState, useEffect } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editOrder) {
      setFormData({
        name: editOrder.name || '',
        mobile: editOrder.mobile || '',
        portrait_type: editOrder.portrait_type || 'pencil',
        size: editOrder.size || 'A4',
        image: null,
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
      toast.warning('Please login first to place an order.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

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
        toast.success('Order updated successfully!');
        setEditOrder(null);
      } else {
        await AxiosInstance.post(`/api/order/users/`, data, config);
        toast.success('Order placed successfully!');
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
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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

      <textarea
        name="adress"
        placeholder="We sketch it. We pack it. We ship it – Right to your address....!"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-4 py-2 rounded transition`}
      >
        {loading ? 'Submitting...' : editOrder ? 'Update Order' : 'Place Order'}
      </button>
    </form>
  );
};

export default OrderForm;
