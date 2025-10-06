import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '../lib/mongodb'; // Using our existing DB connection utility

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation to ensure we have all the data
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ridebooking');
    const usersCollection = db.collection('users');

    // Check if a user with this email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // The '10' is the salt rounds, a measure of complexity

    // Insert the new user into the 'users' collection
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword, // Store the hashed password, NOT the original
      createdAt: new Date(),
   role: 'PASSENGER', // <-- ADD THIS LINE
    });

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}