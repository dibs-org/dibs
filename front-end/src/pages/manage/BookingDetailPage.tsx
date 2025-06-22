import { useParams, Link } from "@tanstack/react-router";
import { useState } from "react";

export const BookingDetailPage = () => {
  const { bookingId } = useParams({ from: "/manage/bookings/$bookingId" });
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock data - in a real app, this would be fetched based on bookingId
  const booking = {
    id: bookingId,
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "(717) 917-5881",
    poolName: "Beautiful Backyard Pool",
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    guests: 4,
    guestList: ["John Doe", "Jane Doe", "Bob Smith", "Alice Johnson"],
    status: "confirmed" as "confirmed" | "pending" | "cancelled",
    totalAmount: 70,
    pricePerHour: 35,
    duration: 2,
    createdAt: "2024-01-10T10:30:00Z",
    specialRequests:
      "Please have the pool heated to 85°F. We'll be celebrating a birthday!",
    address: "123 Pool Lane, Miami, FL 33101",
    wifiPassword: "PoolParty2024",
    contactInstructions:
      "Ring doorbell and wait by the pool gate. I'll come let you in.",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleConfirm = () => {
    // TODO: Implement confirm booking logic
    console.log("Confirming booking:", bookingId);
  };

  const handleCancel = () => {
    // TODO: Implement cancel booking logic
    console.log("Cancelling booking:", bookingId);
    setShowCancelModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Details
            </h1>
            <p className="text-gray-600">Reservation #{booking.id}</p>
          </div>
          <Link
            to="/manage/bookings"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to bookings
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {booking.guestName}
              </h2>
              <p className="text-sm text-gray-500">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}
              >
                {booking.status}
              </span>
              <span className="text-xl font-bold text-gray-900">
                ${booking.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reservation Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reservation Details
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Pool</dt>
                  <dd className="text-sm text-gray-900">{booking.poolName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Date & Time
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {booking.date} • {booking.startTime} - {booking.endTime} (
                    {booking.duration}h)
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Guests
                  </dt>
                  <dd className="text-sm text-gray-900">{booking.guests}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="text-sm text-gray-900">
                    ${booking.pricePerHour}/hour × {booking.duration} hours = $
                    {booking.totalAmount}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Guest Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Guest Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contact</dt>
                  <dd className="text-sm text-gray-900">
                    <div>{booking.guestEmail}</div>
                    <div>{booking.guestPhone}</div>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Guest List
                  </dt>
                  <dd className="text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {booking.guestList.map((guest, index) => (
                        <li key={index}>{guest}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Special Requests
              </h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                {booking.specialRequests}
              </p>
            </div>
          )}

          {/* Information to Share */}
          {booking.status === "confirmed" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Information Shared with Guest
              </h3>
              <div className="bg-blue-50 p-4 rounded-md">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-blue-900">
                      Address
                    </dt>
                    <dd className="text-sm text-blue-800">{booking.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-blue-900">
                      WiFi Password
                    </dt>
                    <dd className="text-sm text-blue-800">
                      {booking.wifiPassword}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-blue-900">
                      Contact Instructions
                    </dt>
                    <dd className="text-sm text-blue-800">
                      {booking.contactInstructions}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href={`tel:${booking.guestPhone}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Call Guest
              </a>
              <a
                href={`mailto:${booking.guestEmail}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Email Guest
              </a>
            </div>

            <div className="flex space-x-3">
              {booking.status === "pending" && (
                <>
                  <button
                    onClick={handleConfirm}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    Decline
                  </button>
                </>
              )}

              {booking.status === "confirmed" && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Cancel Booking
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to cancel this booking? This action
                  cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Yes, Cancel Booking
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="mt-3 px-4 py-2 bg-white text-gray-500 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  No, Keep Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
