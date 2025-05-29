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

export default function VendorPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [partnerId, setPartnerId] = useState('');
  const [token, setToken] = useState(''); 

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);

    if (stored) {
      axios.get('http://localhost:5000/api/orders/vendor', {
        headers: { Authorization: `Bearer ${stored}` },
      }).then(res => setOrders(res.data));
    }
  }, []);

  const assignPartner = async (orderId: string) => {
    if (!partnerId) return alert("Enter delivery partner ID");
    try {
      await axios.post('http://localhost:5000/api/orders/assign', {
        orderId,
        deliveryPartnerId: partnerId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Assigned!");
    } catch (err) {
      alert("Failed to assign");
    }
  };

  return (
    <div className="p-6 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <button
    className="text-sm text-red-600 underline"
    onClick={() => {
      localStorage.removeItem('token');
      window.location.href = '/vendor/login';
    }}
  >
    Logout
  </button>

      <div className="mb-6">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Delivery Partner ID"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-semibold mb-2">Orders:</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="border p-4 rounded shadow">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.customerAddress}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Assigned To:</strong> {order.deliveryPartnerId?.name || 'None'}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => assignPartner(order._id)}
            >
              Assign Partner
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
