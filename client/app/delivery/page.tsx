'use client';
import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

export default function DeliveryPage() {
  const [sending, setSending] = useState(false);
  const [position, setPosition] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (sending) {
      interval = setInterval(() => {
        setPosition(prev => {
          const updated = {
            lat: prev.lat + 0.0001,
            lng: prev.lng + 0.0001,
          };
          socket.emit('locationUpdate', updated);
          console.log("Sent location:", updated);
          return updated;
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [sending]);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Delivery Partner Dashboard</h1>
      <button
        onClick={() => setSending(true)}
        disabled={sending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {sending ? 'Tracking...' : 'Start Delivery'}
      </button>

      <div className="mt-6">
        <p>Current Location:</p>
        <p className="text-sm text-gray-700">
          {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
