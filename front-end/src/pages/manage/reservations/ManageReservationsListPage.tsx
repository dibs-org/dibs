import { Link } from "@tanstack/react-router";
import { useReservationsForMyPools } from "../../../services/reservations/useReservationsForMyPools";
import Button from "../../../components/Button";

export const ManageReservationsListPage = () => {
  const { data: reservations = [] } = useReservationsForMyPools();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Reservations
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your pool reservations
        </p>
      </div>

      {/* Reservations List */}
      <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {reservation.user?.name}
                  </h3>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-xl ${getStatusColor(reservation.status)}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Pool:
                    </span>{" "}
                    {reservation.pool?.name}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Time:
                    </span>{" "}
                    {reservation.startTime} - {reservation.endTime}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Guests:
                    </span>{" "}
                    {reservation.guestCount}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Email:
                    </span>{" "}
                    {reservation.user?.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Phone:
                    </span>{" "}
                    {reservation.user?.phone}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Booked:
                    </span>{" "}
                    {reservation.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    to="/manage/reservations/$reservationId"
                    params={{ reservationId: reservation.id }}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View Details
                  </Link>

                  {reservation.status === "pending" && (
                    <>
                      <Button
                        variant="primary"
                        size="small"
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        className="text-red-600 hover:text-red-500 border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700"
                      >
                        Decline
                      </Button>
                    </>
                  )}

                  {reservation.status === "confirmed" && (
                    <a
                      href={`tel:${reservation.user?.phone}`}
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Call Guest
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {reservations.length === 0 && (
        <div className="text-center py-12 bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 text-gray-400 dark:text-gray-600">
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
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            No reservations
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            No reservations yet.
          </p>
        </div>
      )}
    </div>
  );
};
