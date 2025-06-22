import { createFileRoute } from "@tanstack/react-router";
import { ReservationDetailPage } from "../../../pages/manage/ReservationDetailPage";

export const Route = createFileRoute("/manage/reservations/$reservationId")({
  component: () => <ReservationDetailPage />,
});
