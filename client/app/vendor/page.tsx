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

interface DeliveryBoy {
  _id: string;
  name: string;
}

export default function VendorDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);
  const [token, setToken] = useState('');
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
      fetchDeliveryBoys(t);
    }
  }, []);

  const fetchOrders = async (t: string) => {
    try {
      const res = await axios.get<Order[]>('http://localhost:5000/api/orders/vendor', {
        headers: { Authorization: `Bearer ${t}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders');
    }
  };

  const fetchDeliveryBoys = async (t: string) => {
    try {
      const res = await axios.get<DeliveryBoy[]>('http://localhost:5000/api/auth/deliveryboys', {
        headers: { Authorization: `Bearer ${t}` },
      });
      setDeliveryBoys(res.data);
    } catch (err) {
      console.error('Failed to fetch delivery boys');
    }
  };

  const assignPartner = async (orderId: string, deliveryPartnerId: string) => {
    try {
      await axios.post(
        'http://localhost:5000/api/orders/assign',
        { orderId, deliveryPartnerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Delivery partner assigned successfully!');
      fetchOrders(token);
    } catch {
      alert('Assignment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Vendor Dashboard</h1>
        <h2 className="text-lg text-blue-800 font-semibold mb-6">Welcome, {userName}</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 shadow-sm"
          >
            <p className="text-sm mb-1"><strong>Order ID:</strong> {order._id}</p>
            <p className="text-base mb-1"><strong>Customer:</strong> {order.customerName}</p>
            <p className="text-base mb-1"><strong>Address:</strong> {order.customerAddress}</p>
            <p className="text-base mb-1"><strong>Status:</strong> {order.status}</p>
            <p className="text-base mb-4"><strong>Assigned To:</strong> {order.deliveryPartnerId?.name || 'None'}</p>

            <div>
              <h3 className="text-blue-700 font-semibold mb-2">Assign Delivery Partner:</h3>
              <div className="flex flex-wrap gap-3">
                {deliveryBoys.length === 0 && (
                  <p className="text-gray-500">No delivery partners available</p>
                )}
                {deliveryBoys.map((boy) => (
                  <button
                    key={boy._id}
                    onClick={() => assignPartner(order._id, boy._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    {boy.name} (ID: {boy._id})
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
