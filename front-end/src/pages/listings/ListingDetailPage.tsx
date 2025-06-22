import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const ListingDetailPage = () => {
  const { listingId } = useParams({ from: "/listings/$listingId" });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [guests, setGuests] = useState(4);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Mock data - in a real app, this would be fetched based on listingId
  const listing = {
    id: listingId,
    name: "Beautiful Backyard Pool",
    description:
      "A stunning 20x40 pool with spa and outdoor kitchen. Perfect for family gatherings, birthday parties, or just relaxing with friends. The pool is heated year-round and features a beautiful waterfall feature.",
    ownerName: "David Smith",
    location: "Miami, FL",
    address: "123 Pool Lane, Miami, FL 33101",
    pricePerHour: 35,
    rating: 4.8,
    reviewCount: 24,
    features: [
      "Heated Pool",
      "Hot Tub/Spa",
      "Pool Bar",
      "Outdoor Kitchen",
      "BBQ Grill",
      "Poolside Seating",
      "Parking Available",
      "WiFi",
      "Bathroom Access",
    ],
    amenities: [
      "Towels Provided",
      "Pool Floats",
      "Pool Noodles",
      "Changing Room",
    ],
    rules: [
      "No glass containers in pool area",
      "Children must be supervised at all times",
      "No smoking in pool area",
      "Music volume must be respectful to neighbors",
      "Maximum 8 guests",
    ],
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
    ],
    availableDays: [1, 2, 3, 4, 5], // Monday to Friday
    availableHours: { start: "08:00", end: "20:00" },
  };

  const calculateTotal = () => {
    if (!selectedDate || !startTime || !endTime) return 0;
    const start = new Date(`2024-01-01T${startTime}:00`);
    const end = new Date(`2024-01-01T${endTime}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hours * listing.pricePerHour);
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    console.log("Booking request:", {
      listingId,
      date: selectedDate,
      startTime,
      endTime,
      guests,
      total: calculateTotal(),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{listing.rating}</span>
            <span className="text-gray-500">
              ({listing.reviewCount} reviews)
            </span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">{listing.location}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">Hosted by {listing.ownerName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src={listing.images[0]}
              alt={listing.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-2">
              {listing.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${listing.name} ${index + 2}`}
                  className="w-full h-31 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About this pool
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {listing.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Included amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pool rules
            </h2>
            <ul className="space-y-2">
              {listing.rules.map((rule, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 sticky top-4">
            <div className="mb-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-gray-900">
                  ${listing.pricePerHour}
                </span>
                <span className="text-gray-500">per hour</span>
              </div>
            </div>

            {!showBookingForm ? (
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reserve Now
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Select your dates</h3>

                {/* Calendar */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={[
                      { dayOfWeek: [0, 6] }, // Disable weekends
                      { before: new Date() }, // Disable past dates
                    ]}
                    className="text-sm"
                  />
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      min={listing.availableHours.start}
                      max={listing.availableHours.end}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      min={startTime}
                      max={listing.availableHours.end}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                {selectedDate && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Total</span>
                      <span className="font-medium">${calculateTotal()}</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || calculateTotal() === 0}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Request Booking
                </button>

                <button
                  onClick={() => setShowBookingForm(false)}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
