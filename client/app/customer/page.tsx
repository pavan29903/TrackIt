'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import socket from '@/lib/socket';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false }) as any;
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false }) as any;
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false }) as any;

export default function CustomerPage() {
  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    socket.on('location', (data: { lat: number; lng: number }) => {
      setPosition([data.lat, data.lng]);
    });

    return () => {
      socket.off('location');
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Track Your Order</h2>

      <div
        className={`relative border rounded-md overflow-hidden transition-all duration-300 ${fullScreen ? 'fixed inset-0 z-50' : 'w-[300px] h-[200px]'}`}
        onClick={() => setFullScreen(!fullScreen)}
      >
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} />
        </MapContainer>

        {!fullScreen && (
          <div className="absolute bottom-0 left-0 right-0 text-white text-center bg-black bg-opacity-50 py-1">
            Click to expand
          </div>
        )}

        {fullScreen && (
          <button
            className="absolute top-2 right-2 z-50 bg-white px-3 py-1 rounded shadow"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreen(false);
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
