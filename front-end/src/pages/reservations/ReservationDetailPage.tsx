import { useParams, Link } from "@tanstack/react-router";
import { useReservation } from "../../services/reservation/useReservation";

export const ReservationDetailPage = () => {
  const { reservationId } = useParams({
    from: "/reservations/$reservationId",
  });
  const { data: reservation, isLoading } = useReservation({
    id: reservationId,
  });

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

  const handleCancelReservation = () => {
    // TODO: Implement cancel reservation logic
    console.log("Cancelling reservation:", reservationId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Reservation Details</h1>
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

      <div className="bg-surface shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {reservation.listing?.name}
              </h2>
              <p className="text-sm text-gray-500">
                Hosted by {reservation.hostUser?.name}
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
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-surface/50">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {reservation.status === "confirmed" && (
                <>
                  <a
                    href=""
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Call Host
                  </a>
                  <a
                    href=""
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-surface hover:bg-gray-50"
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
                    onClick={handleCancelReservation}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-surface hover:bg-red-50"
                  >
                    Cancel Reservation
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
