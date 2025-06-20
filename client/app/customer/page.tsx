'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import socket from '@/lib/socket';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function CustomerTracking() {
  const [orderId, setOrderId] = useState('');
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [tracking, setTracking] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const startTracking = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${orderId}`);
      const loc = res.data.location;
      if (loc?.lat && loc?.lng) {
        setPosition({ lat: loc.lat, lng: loc.lng });
        setTracking(true);
      } else {
        alert('Tracking info not available for this order.');
      }
    } catch(_) {
      alert('Invalid order ID or network error');
    }
  };

  useEffect(() => {
    if (!tracking) return;

    const handleLocation = (data: { lat: number; lng: number }) => {
      setPosition({ lat: data.lat, lng: data.lng });
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

      {isLoaded && position && (
        <div className="mt-6 h-96 rounded border border-purple-300 overflow-hidden">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={15}
          >
            <Marker position={position} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
