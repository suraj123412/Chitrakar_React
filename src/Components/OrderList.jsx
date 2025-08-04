import React from 'react';
import AxiosInstance from '../api/AxiosInstance';
import { motion } from 'framer-motion';

const OrderList = ({ orders, fetchOrders, setEditOrder }) => {
  const token = localStorage.getItem('accessToken');
  let user = null;

  if (token) {
    try {
      user = JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error("Token parsing error:", err);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await AxiosInstance.delete(`/api/order/users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(); // Refresh the order list
    } catch (err) {
      console.error('Delete error', err);
      alert("Error deleting order.");
    }
  };

  return (
    <div className="w-max md:w-[85%] lg:w-[70%] mx-auto  px-1">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">🖼️ All Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-1 border hover:shadow-xl transition duration-300"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-800">👤 {order.name}</p>
                <p className="text-sm text-gray-600">📞 {order.mobile}</p>
                <p className="text-sm text-gray-700">🎨 Type: <span className="font-medium">{order.portrait_type}</span></p>
                <p className="text-sm text-gray-700">📐 Size: <span className="font-medium">{order.size}</span></p>
                <p className="text-sm text-gray-700">📝 {order.description}</p>
              </div>

              {order.image && (
                <img
                  src={order.image}
                  alt="order-img"
                  className="mt-3 h-48 w-full object-cover rounded-md border"
                />
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditOrder(order)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
                >
                  Delete
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
