import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function HomePage() {
  // Use getServerSession with our authOptions to get the user's session
  const session = await getServerSession(authOptions);

  // If there is a session, show the logged-in user view
  if (session && session.user) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ride-Share Platform</h1>
        <p className="text-xl mb-4">
          Welcome back, <strong>{session.user.name}</strong>!
        </p>
        <div className="flex justify-center space-x-4">
          {/* === ADD THIS LINK === */}
          <Link href="/dashboard" className="px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600">
            Go to Dashboard
          </Link>
          {/* === END OF NEW LINK === */}
          <Link href="/api/auth/signout" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600">
            Sign Out
          </Link>
        </div>
      </div>
    </main>
  );
}

  // If there is no session, show the logged-out visitor view
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ride-Share Platform</h1>
        <p className="text-xl mb-4">Please sign in to continue.</p>
        <Link href="/api/auth/signin" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Sign In
        </Link>
      </div>
    </main>
  );
}