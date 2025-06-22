import { useParams, Link } from "@tanstack/react-router";
import { useState } from "react";

export const ReservationDetailPage = () => {
  const { reservationId } = useParams({
    from: "/reservations/$reservationId",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editGuests, setEditGuests] = useState(4);

  // Mock data - in a real app, this would be fetched based on reservationId
  const reservation = {
    id: reservationId,
    poolName: "Beautiful Backyard Pool",
    ownerName: "David Smith",
    ownerEmail: "david@example.com",
    ownerPhone: "(555) 123-4567",
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    guests: 4,
    guestList: ["John Doe", "Jane Doe", "Bob Smith", "Alice Johnson"],
    status: "confirmed" as "confirmed" | "pending" | "cancelled" | "completed",
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
    poolFeatures: [
      "Heated Pool",
      "Hot Tub/Spa",
      "Pool Bar",
      "Outdoor Kitchen",
      "Parking",
    ],
    poolRules: [
      "No glass containers in pool area",
      "Children must be supervised at all times",
      "No smoking in pool area",
      "Music volume must be respectful to neighbors",
      "Maximum 8 guests",
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditReservation = () => {
    // TODO: Implement edit reservation logic
    console.log("Updating guest count to:", editGuests);
    setShowEditModal(false);
  };

  const handleCancelReservation = () => {
    // TODO: Implement cancel reservation logic
    console.log("Cancelling reservation:", reservationId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reservation Details
            </h1>
            <p className="text-gray-600">Booking #{reservation.id}</p>
          </div>
          <Link
            to="/reservations"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to reservations
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {reservation.poolName}
              </h2>
              <p className="text-sm text-gray-500">
                Hosted by {reservation.ownerName}
              </p>
              <p className="text-sm text-gray-500">
                Booked on {new Date(reservation.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(reservation.status)}`}
              >
                {reservation.status}
              </span>
              <span className="text-xl font-bold text-gray-900">
                ${reservation.totalAmount}
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
                Booking Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Date & Time
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {reservation.date} • {reservation.startTime} -{" "}
                    {reservation.endTime} ({reservation.duration}h)
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Guests
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {reservation.guests}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Cost
                  </dt>
                  <dd className="text-sm text-gray-900">
                    ${reservation.pricePerHour}/hour × {reservation.duration}{" "}
                    hours = ${reservation.totalAmount}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Guest List
                  </dt>
                  <dd className="text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {reservation.guestList.map((guest, index) => (
                        <li key={index}>{guest}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Host Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Host Contact
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">
                    {reservation.ownerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">
                    {reservation.ownerEmail}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">
                    {reservation.ownerPhone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Special Requests */}
          {reservation.specialRequests && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Special Requests
              </h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                {reservation.specialRequests}
              </p>
            </div>
          )}

          {/* Pool Information */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pool Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {reservation.poolFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pool Rules */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pool Rules
            </h3>
            <ul className="space-y-2">
              {reservation.poolRules.map((rule, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Access Information */}
          {reservation.status === "confirmed" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Location & Access
              </h3>
              <div className="bg-green-50 p-4 rounded-md">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-green-900">
                      Address
                    </dt>
                    <dd className="text-sm text-green-800">
                      {reservation.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-green-900">
                      WiFi Password
                    </dt>
                    <dd className="text-sm text-green-800">
                      {reservation.wifiPassword}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-green-900">
                      Arrival Instructions
                    </dt>
                    <dd className="text-sm text-green-800">
                      {reservation.contactInstructions}
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
              {reservation.status === "confirmed" && (
                <>
                  <a
                    href={`tel:${reservation.ownerPhone}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Call Host
                  </a>
                  <a
                    href={`mailto:${reservation.ownerEmail}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Email Host
                  </a>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              {["confirmed", "pending"].includes(reservation.status) && (
                <>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Edit Booking
                  </button>
                  <button
                    onClick={handleCancelReservation}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    Cancel Reservation
                  </button>
                </>
              )}

              {reservation.status === "completed" && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Leave Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Reservation
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setEditGuests(Math.max(1, editGuests - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{editGuests}</span>
                  <button
                    onClick={() => setEditGuests(Math.min(8, editGuests + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleEditReservation}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-white text-gray-500 text-base font-medium rounded-md shadow-sm border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
