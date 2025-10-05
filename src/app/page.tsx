'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState({
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false,
  });

  const handleDayChange = (day) => {
    setDays(prevDays => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  // === NEW FUNCTION STARTS HERE ===
  const handleSubmit = (event) => {
    // 1. Prevent the browser from refreshing the page
    event.preventDefault();

    // 2. Gather all state data into a single object
    const bookingData = {
      pickupLocation,
      dropoffLocation,
      pickupTime,
      days,
      startDate,
      endDate,
    };

    // 3. Log the data to the developer console!
    console.log('Form Submitted Data:', bookingData);
    alert('Success! Check the developer console for the form data. (Press F12 or right-click -> Inspect)');
  };
  // === NEW FUNCTION ENDS HERE ===

  const dayKeys = Object.keys(days);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center">Schedule Your Recurring Ride</h1>
          <p className="text-center text-gray-500">Fill in the details once, and we ll handle the rest.</p>
        </div>
        
        {/* We connect our new function to the form's onSubmit event */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* All the input fields are the same as before */}
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">Pickup Location</label>
            <input type="text" id="pickup" name="pickup" className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., Kalanki, Kathmandu" required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
          </div>
          <div>
            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">Drop-off Location</label>
            <input type="text" id="dropoff" name="dropoff" className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., Thamel, Kathmandu" required value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} />
          </div>
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Pickup Time</label>
            <input type="time" id="pickupTime" name="pickupTime" className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Days of the Week</label>
            <div className="flex flex-wrap justify-between mt-2">
              {dayKeys.map((day) => (<div key={day} className="flex items-center"><input id={day} name="days" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" checked={days[day]} onChange={() => handleDayChange(day)} /><label htmlFor={day} className="ml-2 text-sm text-gray-900">{day}</label></div>))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" id="startDate" name="startDate" className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="w-1/2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" id="endDate" name="endDate" className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Review & Confirm Booking</button>
        </form>
      </div>
    </main>
  );
}