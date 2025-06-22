import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const ReservationsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - in a real app, this would come from an API
  const reservations = [
    {
      id: "1",
      guestName: "John Doe",
      guestEmail: "john@example.com",
      guestPhone: "(717) 917-5881",
      poolName: "Beautiful Backyard Pool",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "16:00",
      guests: 4,
      status: "confirmed" as const,
      totalAmount: 70,
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      guestName: "Jane Smith",
      guestEmail: "jane@example.com",
      guestPhone: "(717) 917-5881",
      poolName: "Beautiful Backyard Pool",
      date: "2024-01-16",
      startTime: "10:00",
      endTime: "12:00",
      guests: 2,
      status: "pending" as const,
      totalAmount: 70,
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      guestName: "Mike Johnson",
      guestEmail: "mike@example.com",
      guestPhone: "(717) 917-5881",
      poolName: "Resort-Style Pool",
      date: "2024-01-20",
      startTime: "15:00",
      endTime: "18:00",
      guests: 6,
      status: "cancelled" as const,
      totalAmount: 150,
      createdAt: "2024-01-08",
    },
  ];

  const filteredreservations =
    statusFilter === "all"
      ? reservations
      : reservations.filter((booking) => booking.status === statusFilter);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">reservations</h1>
        <p className="text-gray-600">Manage all your pool reservations</p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            {
              key: "all",
              label: "All reservations",
              count: reservations.length,
            },
            {
              key: "pending",
              label: "Pending",
              count: reservations.filter((b) => b.status === "pending").length,
            },
            {
              key: "confirmed",
              label: "Confirmed",
              count: reservations.filter((b) => b.status === "confirmed")
                .length,
            },
            {
              key: "cancelled",
              label: "Cancelled",
              count: reservations.filter((b) => b.status === "cancelled")
                .length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`${
                statusFilter === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <span>{tab.label}</span>
              <span className="bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* reservations List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredreservations.map((booking) => (
            <li key={booking.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {booking.guestName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${booking.totalAmount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Pool:</span>{" "}
                        {booking.poolName}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{" "}
                        {booking.date}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>{" "}
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div>
                        <span className="font-medium">Guests:</span>{" "}
                        {booking.guests}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {booking.guestEmail}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>{" "}
                        {booking.guestPhone}
                      </div>
                      <div>
                        <span className="font-medium">Booked:</span>{" "}
                        {booking.createdAt}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-3">
                  <Link
                    to="/manage/reservations/$reservationId"
                    params={{ reservationId: booking.id }}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    View Details
                  </Link>

                  {booking.status === "pending" && (
                    <>
                      <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                        Confirm
                      </button>
                      <button className="text-red-600 hover:text-red-500 text-sm font-medium">
                        Decline
                      </button>
                    </>
                  )}

                  {booking.status === "confirmed" && (
                    <a
                      href={`tel:${booking.guestPhone}`}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      Call Guest
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredreservations.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No reservations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === "all"
              ? "No reservations yet."
              : `No ${statusFilter} reservations.`}
          </p>
        </div>
      )}
    </div>
  );
};
