import { useEffect, useState } from 'react';
import axios from 'axios';

interface DeliveryBoy {
  _id: string;
  name: string;
}

interface DeliveryBoysListProps {
  onAssign: (deliveryBoyId: string) => void;
}

export default function DeliveryBoysList({ onAssign }: DeliveryBoysListProps) {
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);

  useEffect(() => {
    async function fetchDeliveryBoys() {
      try {
        const res = await axios.get<DeliveryBoy[]>('http://localhost:5000/api/users/deliveryboys');
        setDeliveryBoys(res.data);
      } catch (error) {
        console.error('Failed to fetch delivery boys', error);
      }
    }
    fetchDeliveryBoys();
  }, []);

  return (
    <div className="p-4 border rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-3">Available Delivery Boys</h3>
      <ul>
        {deliveryBoys.map((boy) => (
          <li key={boy._id} className="flex justify-between items-center mb-2">
            <span>{boy.name} (ID: {boy._id})</span>
            <button
              onClick={() => onAssign(boy._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Assign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
