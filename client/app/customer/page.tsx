'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import socket from '@/lib/socket';
import axios from 'axios';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false }) as any;
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false }) as any;
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false }) as any;

export default function CustomerTracking() {
  const [orderId, setOrderId] = useState('');
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [tracking, setTracking] = useState(false);

  const startTracking = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${orderId}`);
      const loc = res.data.location;
      if (loc?.lat && loc?.lng) {
        setPosition([loc.lat, loc.lng]);
        setTracking(true);
      } else {
        alert('Tracking info not available for this order.');
      }
    } catch {
      alert('Invalid order ID or network error');
    }
  };

  useEffect(() => {
    if (!tracking) return;

    const handleLocation = (data: { lat: number; lng: number }) => {
      setPosition([data.lat, data.lng]);
    };

    socket.on('location', handleLocation);

    return () => {
      socket.off('location', handleLocation);
    };
  }, [tracking]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Track Your Order</h2>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="block w-full mb-4 border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={startTracking}
      >
        Start Tracking
      </button>

      {position && (
        <div className="mt-6 h-96 rounded border border-purple-300 overflow-hidden">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} />
          </MapContainer>
        </div>
      )}
    </div>
  );
}
