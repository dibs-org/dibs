import { useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import Button from "../../components/Button";
import { useReservation } from "../../services/reservations/useReservation";
import LinkButton from "../../components/LinkButton";

export const ReservationDetailPage = () => {
  const { reservationId } = useParams({
    from: "/reservations/$reservationId",
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { data: reservation, isLoading } = useReservation({
    id: reservationId,
  });

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

  const handleCancelReservation = () => {
    // TODO: Implement cancel reservation logic
    console.log("Cancelling reservation:", reservationId);
    setShowCancelModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Reservation Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Booking #{reservation.id}
            </p>
          </div>
          <Link
            to="/reservations"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            Back to reservations
          </Link>
        </div>

        <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden ">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  {reservation.pool?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hosted by {reservation.pool.owner.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Booked on{" "}
                  {new Date(reservation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-xl ${getStatusColor(reservation.status)}`}
                >
                  {reservation.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reservation Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Reservation Details
                </h3>
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pool
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      {reservation.pool?.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Date & Time
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      {reservation.startTime} - {reservation.endTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Number of Guests
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      {reservation.guestCount}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Host Information */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Host Information
                </h3>
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Host Name
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      {reservation.pool.owner.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pool Address
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      {reservation.pool?.address ||
                        "Address will be shared upon confirmation"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Information Shared */}
            {reservation.status === "confirmed" && (
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Information Shared by Host
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
                  <dl className="flex flex-col gap-2">
                    <div>
                      <dt className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Address
                      </dt>
                      <dd className="text-sm text-blue-800 dark:text-blue-300">
                        {reservation.pool?.address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 w-full">
            <div className="flex items-center justify-between flex-wrap gap-4 w-full">
              <div className="flex flex-col md:flex-row justify-start md:justify-between gap-3 w-full">
                {/* {reservation.status === "confirmed" && ( */}
                {!reservation.status && (
                  <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
                    <LinkButton
                      to={`tel:${reservation.pool.owner.phone}`}
                      className="w-full md:w-auto"
                    >
                      Call Host
                    </LinkButton>
                    <LinkButton
                      to={`sms:${reservation.pool.owner.phone}`}
                      className="w-full md:w-auto"
                    >
                      Text Host
                    </LinkButton>
                    <LinkButton
                      to={`mailto:${reservation.pool.owner.email}`}
                      className="w-full md:w-auto"
                    >
                      Email Host
                    </LinkButton>
                  </div>
                )}
                {!reservation.status && (
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 8.586V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Waiting for host to confirm
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {["confirmed", "pending"].includes(reservation.status) && (
                  <Button
                    onClick={() => setShowCancelModal(true)}
                    variant="secondary"
                    className="text-red-600 hover:text-red-500 border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700"
                  >
                    Cancel Reservation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative border border-gray-200 dark:border-gray-800 w-full max-w-md bg-surface rounded-2xl shadow-xl">
              <div className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Cancel Reservation
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to cancel this reservation? This
                      action cannot be undone.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      onClick={handleCancelReservation}
                      variant="primary"
                      className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                      Yes, Cancel Reservation
                    </Button>
                    <Button
                      onClick={() => setShowCancelModal(false)}
                      variant="secondary"
                      className="w-full"
                    >
                      No, Keep Reservation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
