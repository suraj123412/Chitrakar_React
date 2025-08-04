import React, { useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { motion } from 'framer-motion';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);

  const fetchOrders = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await AxiosInstance.get('api/order/users/', {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass token
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-max mx-auto px-4 mt-20 text-gray-800 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 p-10">Place Your Portrait Order</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Form */}
        <motion.div
          className="w-full md:w-1/2 bg-white shadow-md mt-4 rounded-lg p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <OrderForm fetchOrders={fetchOrders} editOrder={editOrder} setEditOrder={setEditOrder} />
        </motion.div>

        {/* Right - Order List */}
        <motion.div
          className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <OrderList orders={orders} fetchOrders={fetchOrders} setEditOrder={setEditOrder} />
        </motion.div>
      </div>
    </div>
  );
};

export default Order;
