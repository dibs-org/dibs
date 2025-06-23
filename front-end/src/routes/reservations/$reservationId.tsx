import { createFileRoute } from "@tanstack/react-router";
import { ReservationDetailPage } from "../../pages/reservations/ReservationDetailPage";

export const Route = createFileRoute("/reservations/$reservationId")({
  component: () => (
    <div className="min-h-[calc(100vh-100px)] w-full max-w-[1000px] mx-auto flex justify-center p-4">
      <ReservationDetailPage />
    </div>
  ),
});
