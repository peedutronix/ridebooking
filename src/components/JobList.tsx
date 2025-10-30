'use client'; // This MUST be the very first line

import { useState } from 'react';

// We define the shape of the booking data we'll receive
type Booking = {
  _id: string;
  pickupLocation: string;
  dropoffLocation: string;
  userEmail: string;
};

// We only have one 'export default' for the entire file
export default function JobList({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async (bookingId: string) => {
    setLoadingId(bookingId);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}/accept`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to accept job.');
      }

      // If successful, instantly remove the booking from the list on the screen
      setBookings(currentBookings => 
        currentBookings.filter(booking => booking._id !== bookingId)
      );

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Available Jobs</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-gray-50">
              <div>
                <p><strong>From:</strong> {booking.pickupLocation}</p>
                <p><strong>To:</strong> {booking.dropoffLocation}</p>
                <p className="text-sm text-gray-500">Booked by: {booking.userEmail}</p>
              </div>
              <button 
                onClick={() => handleAccept(booking._id)}
                disabled={loadingId === booking._id}
                className="px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
              >
                {loadingId === booking._id ? 'Accepting...' : 'Accept Job'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available jobs at the moment.</p>
      )}
    </div>
  );
}