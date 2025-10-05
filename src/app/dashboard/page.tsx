import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import clientPromise from "../api/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

// Ensure the Booking type includes pickupTime
type Booking = {
  _id: ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string; // Make sure this is included
  startDate: string;
  endDate: string;
  userEmail: string;
  submittedAt: string;
  days: { [key: string]: boolean };
};

async function getUserBookings(email: string): Promise<Booking[]> {
  try {
    const client = await clientPromise;
    const db = client.db("ridebooking");
    const bookings = await db
      .collection("bookings")
      .find({ userEmail: email })
      .sort({ submittedAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(bookings)) as Booking[];
  } catch (error) {
    console.error("Database Error: Failed to fetch bookings.", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const bookings = await getUserBookings(session.user.email);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <Link href="/booking" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
            + Book New Ride
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => {
                const selectedDays = Object.entries(booking.days)
                  .filter(([, isSelected]) => isSelected)
                  .map(([day]) => day)
                  .join(', ');

                return (
                  <li key={booking._id.toString()} className="p-4 border rounded-lg shadow-sm bg-white">
                    <div className="font-bold text-lg">{booking.pickupLocation} → {booking.dropoffLocation}</div>
                    {/* === THE FINAL ADDITION === */}
                    <p className="text-sm text-gray-600"><strong>Time:</strong> {booking.pickupTime}</p>
                    <p className="text-sm text-gray-600"><strong>Dates:</strong> {booking.startDate} to {booking.endDate}</p>
                    <p className="text-sm text-gray-600"><strong>On:</strong> {selectedDays || 'No days selected'}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>You have not made any bookings yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}