'use client';

import { useState, FormEvent } from 'react';
import { Session } from 'next-auth';

type BookingFormProps = {
  user: Session['user'];
};

export default function BookingForm({ user }: BookingFormProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState({ Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDayChange = (day: keyof typeof days) => {
    setDays(prevDays => ({ ...prevDays, [day]: !prevDays[day] }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    const bookingData = {
      pickupLocation,
      dropoffLocation,
      pickupTime,
      days,
      startDate,
      endDate,
      userEmail: user?.email,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSuccessMessage('Booking confirmed! Your ride is scheduled.');
    } catch (err: unknown) {
      console.error('Booking submission error:', err);
      setError('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dayKeys = Object.keys(days) as Array<keyof typeof days>;

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Schedule Your Recurring Ride</h1>
        <p className="text-gray-500">Welcome, {user?.name}!</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div><label htmlFor="pickup" className="block text-sm font-medium text-gray-700">Pickup Location</label><input type="text" id="pickup" className="w-full p-2 mt-1 border border-gray-300 rounded-md" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required /></div>
        <div><label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">Drop-off Location</label><input type="text" id="dropoff" className="w-full p-2 mt-1 border border-gray-300 rounded-md" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required /></div>
        <div><label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Pickup Time</label><input type="time" id="pickupTime" className="w-full p-2 mt-1 border border-gray-300 rounded-md" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required /></div>
        <div><label className="block text-sm font-medium text-gray-700">Days of the Week</label><div className="flex flex-wrap justify-between mt-2">{dayKeys.map((day) => (<div key={day} className="flex items-center"><input id={day} type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" checked={days[day]} onChange={() => handleDayChange(day)} /><label htmlFor={day} className="ml-2 text-sm">{day}</label></div>))}</div></div>
        <div className="flex space-x-4"><div className="w-1/2"><label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label><input type="date" id="startDate" className="w-full p-2 mt-1 border border-gray-300 rounded-md" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></div><div className="w-1/2"><label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label><input type="date" id="endDate" className="w-full p-2 mt-1 border border-gray-300 rounded-md" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></div></div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Review & Confirm Booking'}</button>
        {successMessage && <p className="text-center text-green-600 mt-4">{successMessage}</p>}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
}