import { Link } from "@tanstack/react-router";
import { useReservations } from "../../../services/reservation/useReservations";

export const ManageReservationsListPage = () => {
  const { data: reservations = [] } = useReservations();

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
        <h1 className="text-2xl font-medium">Reservations</h1>
        <p className="text-gray-600">Manage all your pool reservations</p>
      </div>

      {/* reservations List */}
      <div className="bg-surface shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        {reservation.renterUser?.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}
                        >
                          {reservation.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Pool:</span>{" "}
                        {reservation.listing?.name}
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
                        {reservation.numberOfGuests}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {reservation.renterUser?.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>{" "}
                        {reservation.renterUser?.phone}
                      </div>
                      <div>
                        <span className="font-medium">Booked:</span>{" "}
                        {reservation.createdAt}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-3">
                  <Link
                    to="/manage/reservations/$reservationId"
                    params={{ reservationId: reservation.id }}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    View Details
                  </Link>

                  {reservation.status === "pending" && (
                    <>
                      <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                        Confirm
                      </button>
                      <button className="text-red-600 hover:text-red-500 text-sm font-medium">
                        Decline
                      </button>
                    </>
                  )}

                  {reservation.status === "confirmed" && (
                    <a
                      href={`tel:${reservation.renterUser?.phone}`}
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

      {reservations.length === 0 && (
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
          <h3 className="mt-2 text-sm font-medium">No reservations</h3>
          <p className="mt-1 text-sm text-gray-500">No reservations yet.</p>
        </div>
      )}
    </div>
  );
};
