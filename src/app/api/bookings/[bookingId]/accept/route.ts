import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== 'RIDER') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await params;
    if (!bookingId) {
      return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ridebooking');

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId), riderId: { $exists: false } },
      { 
        $set: { 
          riderId: session.user.id,
          riderEmail: session.user.email,
          status: 'accepted',
          acceptedAt: new Date(),
        } 
      }
    );

    if (result.modifiedCount === 0) {
        return NextResponse.json({ message: 'Booking not found or already accepted' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking accepted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Accept Booking Error:', error);
    return NextResponse.json({ message: 'Error accepting booking' }, { status: 500 });
  }
}