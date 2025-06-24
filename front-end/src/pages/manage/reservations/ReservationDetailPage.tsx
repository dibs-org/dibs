import { useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import Button from "../../../components/Button";
import { useReservation } from "../../../services/reservations/useReservation";

export const ReservationDetailPage = () => {
  const { reservationId } = useParams({
    from: "/manage/reservations/$reservationId",
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
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const handleConfirm = () => {
    // TODO: Implement confirm booking logic
    console.log("Confirming booking:", reservationId);
  };

  const handleCancel = () => {
    // TODO: Implement cancel booking logic
    console.log("Cancelling booking:", reservationId);
    setShowCancelModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Booking Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Reservation #{reservation.id}
            </p>
          </div>
          <Link
            to="/manage/reservations"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            Back to reservations
          </Link>
        </div>

        <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  {reservation.user?.name}
                </h2>
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
                      99
                      {/* {reservation.guests} */}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Guest Information */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Guest Information
                </h3>
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Contact
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">
                      <div>{reservation.user?.email}</div>
                      <div>{reservation.user?.phone}</div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Guest List
                    </dt>
                    TBD
                    {/* <dd className="text-sm text-gray-900 dark:text-gray-100">
                      <ul className="list-disc list-inside">
                        {reservation.guestList.map((guest, index) => (
                          <li key={index}>{guest}</li>
                        ))}
                      </ul>
                    </dd> */}
                  </div>
                </dl>
              </div>
            </div>

            {/* Special Requests */}
            {/* {reservation.specialRequests && (
              <div className="mt-6 flex flex-col gap-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Special Requests
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  {reservation.specialRequests}
                </p>
              </div>
            )} */}

            {/* Information to Share */}
            {reservation.status === "confirmed" && (
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Information Shared with Guest
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
                    {/* <div>
                      <dt className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        WiFi Password
                      </dt>
                      <dd className="text-sm text-blue-800 dark:text-blue-300">
                        {reservation.pool?.wifiPassword}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Contact Instructions
                      </dt>
                      <dd className="text-sm text-blue-800 dark:text-blue-300">
                        {reservation.pool?.contactInstructions}
                      </dd>
                    </div> */}
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-3">
                <a
                  href={`tel:${reservation.user?.phone}`}
                  className="inline-block"
                >
                  <Button variant="primary">Call Guest</Button>
                </a>
                <a
                  href={`mailto:${reservation.user?.email}`}
                  className="inline-block"
                >
                  <Button variant="secondary">Email Guest</Button>
                </a>
              </div>

              <div className="flex gap-3">
                {reservation.status === "pending" && (
                  <>
                    <Button
                      onClick={handleConfirm}
                      variant="primary"
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Confirm Booking
                    </Button>
                    <Button
                      onClick={() => setShowCancelModal(true)}
                      variant="secondary"
                      className="text-red-600 hover:text-red-500 border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700"
                    >
                      Decline
                    </Button>
                  </>
                )}

                {reservation.status === "confirmed" && (
                  <Button
                    onClick={() => setShowCancelModal(true)}
                    variant="secondary"
                    className="text-red-600 hover:text-red-500 border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700"
                  >
                    Cancel Booking
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
                    Cancel Booking
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to cancel this booking? This action
                      cannot be undone.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      onClick={handleCancel}
                      variant="primary"
                      className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                      Yes, Cancel Booking
                    </Button>
                    <Button
                      onClick={() => setShowCancelModal(false)}
                      variant="secondary"
                      className="w-full"
                    >
                      No, Keep Booking
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
