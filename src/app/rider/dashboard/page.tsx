import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import clientPromise from "../../api/lib/mongodb";
import JobList from "../../../components/JobList"; // Import our new client component
import { ObjectId } from "mongodb";

type Booking = {
  _id: ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  userEmail: string;
};

async function getAvailableBookings(): Promise<Booking[]> {
  try {
    const client = await clientPromise;
    const db = client.db("ridebooking");
    const bookings = await db
      .collection("bookings")
      .find({ riderId: { $exists: false } })
      .sort({ submittedAt: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Database Error: Failed to fetch available bookings.", error);
    return [];
  }
}

export default async function RiderDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== 'RIDER') {
    redirect("/api/auth/signin?callbackUrl=/rider/dashboard");
  }

  const availableBookings = await getAvailableBookings();

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Rider Dashboard</h1>
        {/* The Server Page renders the Client Component and passes data to it */}
        <JobList initialBookings={availableBookings} />
      </div>
    </main>
  );
}