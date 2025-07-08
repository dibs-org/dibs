import { Link } from "@tanstack/react-router";
import { useMyReservations } from "../../services/reservations/useMyReservations";
import { useReservationsForMyPools } from "../../services/reservations/useReservationsForMyPools";
import Button from "../../components/Button";
import { Pool, Reservation } from "../../types";
import { useMyPools } from "../../services/pools/useMyPools";
import LinkButton from "../../components/LinkButton";
import { usePool } from "../../services/pools/usePool";
import Heading from "../../components/Heading";

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const ReservationItem = ({
  reservation,
  getStatusColor,
}: {
  reservation: Reservation;
  getStatusColor: (status: string) => string;
}) => (
  <div key={reservation.id} className="p-6">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {reservation.pool.name}
        </h3>
        <span
          className={`inline-flex px-3 py-1 text-xs font-medium rounded-xl ${getStatusColor(
            reservation.status
          )}`}
        >
          {reservation.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
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
            Host:
          </span>{" "}
          {reservation.pool.owner.name}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Link
          to="/reservations/$reservationId"
          params={{ reservationId: reservation.id }}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

const PoolItem = ({ pool }: { pool: Pool }) => (
  <div
    key={pool.id}
    className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden"
  >
    <div className="p-6 flex flex-col gap-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {pool.name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {pool.description}
      </p>

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
);

const DashboardPage = () => {
  const { data: myReservations = [], isLoading: isMyReservationsLoading } =
    useMyReservations();
  const { data: myPools = [], isLoading: isMyPoolsLoading } = useMyPools();
  const {
    data: reservationsForMyPools = [],
    isLoading: isReservationsForMyPoolsLoading,
  } = useReservationsForMyPools();
  const { data: poolDetails } = usePool({
    poolId: "04011455-c63b-445c-8426-aa21fbe5c2ff",
  });

  const isLoading =
    isMyReservationsLoading ||
    isMyPoolsLoading ||
    isReservationsForMyPoolsLoading;

  let isRenter = false;
  let isOwner = false;

  if (
    (myReservations.length > 0 || myPools.length > 0) &&
    reservationsForMyPools.length === 0
  ) {
    isRenter = true;
  } else if (
    (myPools.length > 0 || reservationsForMyPools.length > 0) &&
    myReservations.length === 0
  ) {
    isOwner = true;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!isRenter && !isOwner) {
    return (
      <div className="flex flex-col gap-4 max-w-6xl mx-auto">
        {poolDetails && (
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Suggested Pool
            </div>
            <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-8">
              <Heading size="lg">{poolDetails.name}</Heading>
              <div className="mt-4">
                <LinkButton to={`/pools/${poolDetails.id}`} variant="primary">
                  View Pool
                </LinkButton>
              </div>
            </div>
          </div>
        )}
        <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            Welcome to Dibs!
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Get started by exploring our pools or creating your own listing.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <LinkButton to="/pools" variant="primary">
              Browse Pools
            </LinkButton>
            <LinkButton to="/manage/pools/new" variant="secondary">
              Create Pool
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your pool activity at a glance.
        </p>
      </div>

      {/* My Recent Reservations Section */}
      {isRenter && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                My Recent Reservations
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your latest pool bookings
              </p>
            </div>
            {myReservations.length > 3 && (
              <Link
                to="/reservations"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                View all
              </Link>
            )}
          </div>

          {myReservations.length > 0 ? (
            <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {myReservations.slice(0, 3).map((reservation) => (
                  <ReservationItem
                    key={reservation.id}
                    reservation={reservation}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl">
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
                No reservations yet
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Browse pools and make your first reservation.
              </p>
            </div>
          )}
        </div>
      )}

      {/* My Pools Section */}
      {isOwner && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                My Pools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your pool listings
              </p>
            </div>
            {myPools.length > 3 && (
              <Link
                to="/manage/pools"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                View all
              </Link>
            )}
          </div>

          {myPools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPools.slice(0, 3).map((pool) => (
                <PoolItem key={pool.id} pool={pool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl">
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
                No pools yet
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Get started by creating your first pool listing.
              </p>
              <div className="mt-4">
                <Link to="/manage/pools/new">
                  <Button variant="primary">Add Pool</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Reservations for My Pools Section */}
      {isOwner && myPools.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                Recent Reservations for My Pools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Latest bookings from guests
              </p>
            </div>
            {reservationsForMyPools.length > 3 && (
              <Link
                to="/manage/reservations"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                View all
              </Link>
            )}
          </div>

          {reservationsForMyPools.length > 0 ? (
            <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {reservationsForMyPools.slice(0, 3).map((reservation) => (
                  <ReservationItem
                    key={reservation.id}
                    reservation={reservation}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl">
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
                No reservations yet
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                No guests have booked your pools yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
