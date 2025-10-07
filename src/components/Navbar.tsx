import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800">
          RideShare
        </Link>
        <div className="flex items-center space-x-4">
          {session && session.user ? (
            // Links for LOGGED-IN users
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/booking" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                Book a Ride
              </Link>
              <Link href="/api/auth/signout" className="px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">
                Sign Out
              </Link>
            </>
          ) : (
            // Links for GUESTS
            <>
              <Link href="/api/auth/signin" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}