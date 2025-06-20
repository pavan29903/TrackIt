'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DeliveryRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role: 'delivery',
      });
      localStorage.setItem('token', res.data.token);
      alert('Registered successfully!');
      router.push('/delivery');
    } catch{
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Deliveryboy Registration</h2>

        <input
          type="text"
          placeholder="Name"
          className="mb-4 w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-blue-600">
          Already have an account?{' '}
          <Link href="/delivery/login" className="underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
