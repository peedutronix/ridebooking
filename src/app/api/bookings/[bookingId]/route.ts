import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Security Check: Ensure a user is logged in and has the 'RIDER' role.
    if (!session || !session.user || (session.user as any).role !== 'RIDER') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = params; // Get the specific booking ID from the URL

    const client = await clientPromise;
    const db = client.db('ridebooking');

    // 2. Update the specific booking in the database
    const result = await db.collection('bookings').updateOne(
      // Find the booking by its ID, but ONLY if it hasn't been accepted yet
      { _id: new ObjectId(bookingId), riderId: { $exists: false } },
      // Set the new fields to claim the job
      { 
        $set: { 
          riderId: (session.user as any).id, // Get the rider's ID from their session
          riderEmail: session.user.email,
          status: 'accepted',
          acceptedAt: new Date(),
        } 
      }
    );

    // If no document was modified, it means the job was already taken or didn't exist
    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Job not available or already accepted' }, { status: 409 }); // 409 Conflict
    }

    // 3. Return a success response
    return NextResponse.json({ message: 'Booking accepted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Accept Booking Error:', error);
    return NextResponse.json({ message: 'Error accepting booking' }, { status: 500 });
  }
}