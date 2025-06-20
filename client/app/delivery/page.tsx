'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '@/lib/socket';

interface Order {
  _id: string;
  customerName: string;
  customerAddress: string;
  status: string;
}

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState('');
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        setUserName(payload.name || 'Delivery Partner');
      } catch(error) {
        setUserName('Delivery Partner');
      }
      fetchOrders(t);
    }
  }, []);

  const fetchOrders = async (t: string) => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/delivery', {
        headers: { Authorization: `Bearer ${t}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders');
    }
  };

  const startTracking = (orderId: string) => {
    setTrackingId(orderId);
    let lat = 12.9716;
    let lng = 77.5946;

    const interval = setInterval(() => {
      lat += 0.0001;
      lng += 0.0001;
      socket.emit('locationUpdate', { lat, lng });

      axios.post('http://localhost:5000/api/orders/location', { lat, lng }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setTrackingId(null);
    }, 30000); 
  };

  const markDelivered = async (orderId: string) => {
    try {
      await axios.post('http://localhost:5000/api/orders/delivered', {
        orderId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order marked as delivered!');
      fetchOrders(token);
    } catch(error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Delivery Dashboard</h1>
        <h2 className="text-lg text-blue-800 font-semibold mb-6">Welcome, {userName}</h2>

        {orders.map(order => (
          <div key={order._id} className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4 shadow-sm space-y-2">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.customerAddress}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => startTracking(order._id)}
                disabled={trackingId === order._id}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {trackingId === order._id ? 'Tracking...' : 'Start Delivery'}
              </button>
              <button
                onClick={() => markDelivered(order._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Mark Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
