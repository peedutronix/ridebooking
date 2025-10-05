export default function BookingPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center">
            Schedule Your Recurring Ride
          </h1>
          <p className="text-center text-gray-500">
            Fill in the details once, and we'll handle the rest.
          </p>
        </div>
        
        <form className="space-y-4">
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

          {/* Time, Day, and Date fields will go here */}

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next Step
          </button>
        </form>
      </div>
    </main>
  );
}