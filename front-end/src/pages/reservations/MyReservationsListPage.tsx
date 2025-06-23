import { Link, useNavigate } from "@tanstack/react-router";
import { useMyReservations } from "../../services/reservation/useMyReservations";

export const MyReservationsListPage = () => {
  const navigate = useNavigate();
  const { data: reservations = [] } = useMyReservations();

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-medium">Reservations</h1>
        <p className="text-gray-600">
          View and manage all your pool reservations
        </p>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6"
            onClick={() => {
              navigate({
                to: "/reservations/$reservationId",
                params: { reservationId: reservation.id },
              });
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium">
                    {reservation.listing?.name}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}
                  >
                    {reservation.status}
                  </span>
                </div>
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
                    href={`tel:`}
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
    </div>
  );
};
