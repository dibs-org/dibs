import { Link } from "@tanstack/react-router";
import { usePools } from "../../services/pools/usePools";
import { useReservations } from "../../services/reservations/useReservations";
import Button from "../../components/Button";

export const OwnerDashboard = () => {
  const { data: pools = [] } = usePools();
  const { data: reservations = [] } = useReservations();

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
    <div className="flex flex-col gap-8 max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your pool business.
        </p>
      </div>

      {/* Reservations Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            Recent Reservations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your latest pool reservations
          </p>
        </div>

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

      {/* Pools Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            My pools
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Your pools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {pools.map((pool) => (
            <div
              key={pool.id}
              className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {pool.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {pool.description}
                </p>

                {/* <div className="flex flex-wrap gap-2">
                  {pool.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      {amenity}
                    </span>
                  ))}
                </div> */}

                <Link
                  to="/manage/pools/$poolId"
                  params={{ poolId: pool.id }}
                  className="w-full"
                >
                  <Button variant="secondary" className="w-full">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {pools.length === 0 && (
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              No pools
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Get started by creating your first pool.
            </p>
            <div className="mt-6">
              <Link to="/manage/pools/new">
                <Button variant="primary">Add Pool</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
