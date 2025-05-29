'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  customerName: string;
  customerAddress: string;
  status: string;
  deliveryPartnerId?: {
    name: string;
    _id: string;
  };
}

export default function VendorDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState('');
  const [assignMap, setAssignMap] = useState<{ [orderId: string]: string }>({});
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        setUserName(payload.name || 'Vendor');
      } catch {
        setUserName('Vendor');
      }
      fetchOrders(t);
    }
  }, []);

  const fetchOrders = async (t: string) => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/vendor', {
        headers: { Authorization: `Bearer ${t}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders');
    }
  };

  const assignPartner = async (orderId: string) => {
    const partnerId = assignMap[orderId];
    if (!partnerId) return alert('Enter delivery partner ID');

    try {
      await axios.post(
        'http://localhost:5000/api/orders/assign',
        { orderId, deliveryPartnerId: partnerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Assigned!');
      fetchOrders(token);
    } catch {
      alert('Assignment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Vendor Dashboard</h1>
        <h2 className="text-lg text-blue-800 font-semibold mb-6">Welcome, {userName}</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4 shadow-sm"
          >
            <p className="text-sm"><strong>Order ID:</strong> {order._id}</p>
            <p className="text-base"><strong>Customer:</strong> {order.customerName}</p>
            <p className="text-base"><strong>Address:</strong> {order.customerAddress}</p>
            <p className="text-base"><strong>Status:</strong> {order.status}</p>
            <p className="text-base"><strong>Assigned To:</strong> {order.deliveryPartnerId?.name || 'None'}</p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-4">
              <input
                className="border border-blue-300 px-3 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Delivery Partner ID"
                value={assignMap[order._id] || ''}
                onChange={(e) =>
                  setAssignMap({ ...assignMap, [order._id]: e.target.value })
                }
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
                onClick={() => assignPartner(order._id)}
                disabled={!assignMap[order._id]}
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
