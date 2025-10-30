import { NextResponse } from 'next/server';
import clientPromise from '../lib/mongodb';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ridebooking"); // Or your preferred database name

    // Get the booking data from the request sent by the frontend
    const bookingData = await request.json();

    // Insert the booking data into a new 'bookings' collection
    const result = await db.collection("bookings").insertOne(bookingData);
    
    // Log the new booking's ID to the server console
    console.log(`New booking inserted with id: ${result.insertedId}`);

    // Send a success response back to the frontend
    return NextResponse.json({ message: "Booking created successfully!", bookingId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}