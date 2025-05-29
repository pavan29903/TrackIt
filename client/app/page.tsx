import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">TrackIt Delivery Platform</h1>
        <p className="text-gray-600 mb-8">
          A real-time multi-role delivery tracker for vendors, delivery partners, and customers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Vendor */}
          <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Vendor</h2>
            <p className="text-sm text-gray-600 mb-4">
              Create and manage delivery orders. Assign delivery partners and track status.
            </p>
            <Link href="/vendor/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Login</button>
            </Link>
            <Link href="/vendor/register">
              <p className="text-xs mt-2 text-blue-600 hover:underline text-center">New vendor? Register here</p>
            </Link>
          </div>

          {/* Delivery Partner */}
          <div className="bg-green-50 border border-green-300 rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Delivery Partner</h2>
            <p className="text-sm text-gray-600 mb-4">
              Get assigned to orders, track routes, and send real-time location updates.
            </p>
            <Link href="/delivery/login">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Login</button>
            </Link>
            <Link href="/delivery/register">
              <p className="text-xs mt-2 text-green-700 hover:underline text-center">New partner? Register here</p>
            </Link>
          </div>

          {/* Customer */}
          <div className="bg-purple-50 border border-purple-300 rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Customer</h2>
            <p className="text-sm text-gray-600 mb-4">
              Track your delivery partner in real time with a live map experience.
            </p>
            <Link href="/customer">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">Track Order</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
