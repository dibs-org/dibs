import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const ReservationsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - in a real app, this would come from an API
  const reservations = [
    {
      id: "1",
      poolName: "Beautiful Backyard Pool",
      ownerName: "David Smith",
      ownerPhone: "(555) 123-4567",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "16:00",
      guests: 4,
      status: "confirmed" as const,
      totalAmount: 70,
      createdAt: "2024-01-10",
      address: "123 Pool Lane, Miami, FL 33101",
      wifiPassword: "PoolParty2024",
    },
    {
      id: "2",
      poolName: "Resort-Style Pool",
      ownerName: "Sarah Johnson",
      ownerPhone: "(555) 987-6543",
      date: "2024-01-20",
      startTime: "10:00",
      endTime: "13:00",
      guests: 6,
      status: "pending" as const,
      totalAmount: 150,
      createdAt: "2024-01-12",
      address: "456 Resort Way, Fort Lauderdale, FL 33301",
    },
    {
      id: "3",
      poolName: "Cozy Family Pool",
      ownerName: "Mike Wilson",
      ownerPhone: "(555) 456-7890",
      date: "2024-01-05",
      startTime: "15:00",
      endTime: "18:00",
      guests: 4,
      status: "completed" as const,
      totalAmount: 75,
      createdAt: "2024-01-01",
      address: "789 Family St, Coral Gables, FL 33134",
    },
    {
      id: "4",
      poolName: "Luxury Pool Experience",
      ownerName: "Lisa Brown",
      ownerPhone: "(555) 321-0987",
      date: "2024-01-08",
      startTime: "12:00",
      endTime: "15:00",
      guests: 8,
      status: "cancelled" as const,
      totalAmount: 180,
      createdAt: "2024-01-02",
      address: "321 Luxury Ln, Miami Beach, FL 33139",
    },
  ];

  const filteredReservations =
    statusFilter === "all"
      ? reservations
      : reservations.filter(
          (reservation) => reservation.status === statusFilter
        );

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

  const upcomingReservations = reservations.filter(
    (r) =>
      ["confirmed", "pending"].includes(r.status) &&
      new Date(r.date) > new Date()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Reservations</h1>
        <p className="text-gray-600">View and manage all your pool bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {reservations.length}
          </div>
          <div className="text-sm text-gray-500">Total Bookings</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {upcomingReservations.length}
          </div>
          <div className="text-sm text-gray-500">Upcoming</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">
            ${reservations.reduce((sum, r) => sum + r.totalAmount, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {reservations.filter((r) => r.status === "completed").length}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            {
              key: "all",
              label: "All Reservations",
              count: reservations.length,
            },
            {
              key: "upcoming",
              label: "Upcoming",
              count: upcomingReservations.length,
            },
            {
              key: "confirmed",
              label: "Confirmed",
              count: reservations.filter((r) => r.status === "confirmed")
                .length,
            },
            {
              key: "pending",
              label: "Pending",
              count: reservations.filter((r) => r.status === "pending").length,
            },
            {
              key: "completed",
              label: "Completed",
              count: reservations.filter((r) => r.status === "completed")
                .length,
            },
            {
              key: "cancelled",
              label: "Cancelled",
              count: reservations.filter((r) => r.status === "cancelled")
                .length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setStatusFilter(tab.key === "upcoming" ? "confirmed" : tab.key)
              }
              className={`${
                statusFilter === tab.key ||
                (tab.key === "upcoming" && statusFilter === "confirmed")
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

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white border border-gray-200 rounded-lg shadow p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {reservation.poolName}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Host:</span>{" "}
                    {reservation.ownerName}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {reservation.date}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>{" "}
                    {reservation.startTime} - {reservation.endTime}
                  </div>
                  <div>
                    <span className="font-medium">Guests:</span>{" "}
                    {reservation.guests}
                  </div>
                </div>

                {reservation.status === "confirmed" && (
                  <div className="mt-3 p-3 bg-green-50 rounded-md">
                    <h4 className="text-sm font-medium text-green-900 mb-2">
                      Booking Details
                    </h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <div>
                        <span className="font-medium">Address:</span>{" "}
                        {reservation.address}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>{" "}
                        {reservation.ownerPhone}
                      </div>
                      {reservation.wifiPassword && (
                        <div>
                          <span className="font-medium">WiFi:</span>{" "}
                          {reservation.wifiPassword}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-6 text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${reservation.totalAmount}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Booked on {reservation.createdAt}
              </div>

              <div className="flex space-x-3">
                <Link
                  to="/reservations/$reservationId"
                  params={{ reservationId: reservation.id }}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  View Details
                </Link>

                {reservation.status === "confirmed" && (
                  <a
                    href={`tel:${reservation.ownerPhone}`}
                    className="text-green-600 hover:text-green-500 text-sm font-medium"
                  >
                    Call Host
                  </a>
                )}

                {reservation.status === "pending" && (
                  <button className="text-red-600 hover:text-red-500 text-sm font-medium">
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReservations.length === 0 && (
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
              ? "You haven't made any reservations yet."
              : `No ${statusFilter} reservations.`}
          </p>
          <div className="mt-6">
            <Link
              to="/listings"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Pools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
