export default function BookingPage() {
  // An array to make creating checkboxes easier to manage
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center">
            Schedule Your Recurring Ride
          </h1>
          <p className="text-center text-gray-500">
            Fill in the details once, and we ll handle the rest.
          </p>
        </div>
        
        <form className="space-y-6">
          {/* Location Fields */}
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickup"
              name="pickup"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Kalanki, Kathmandu"
              required
            />
          </div>
          
          <div>
            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">
              Drop-off Location
            </label>
            <input
              type="text"
              id="dropoff"
              name="dropoff"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Thamel, Kathmandu"
              required
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Days of the Week */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Days of the Week
            </label>
            <div className="flex flex-wrap justify-between mt-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    id={day}
                    name="days"
                    type="checkbox"
                    value={day}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={day} className="ml-2 text-sm text-gray-900">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* === NEW CODE STARTS HERE === */}

          {/* Date Range */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          {/* === NEW CODE ENDS HERE === */}

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Review & Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
}