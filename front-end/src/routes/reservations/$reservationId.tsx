import { createFileRoute } from "@tanstack/react-router";
import { ReservationDetailPage } from "../../pages/reservations/ReservationDetailPage";

export const Route = createFileRoute("/reservations/$reservationId")({
  component: () => <ReservationDetailPage />,
});
