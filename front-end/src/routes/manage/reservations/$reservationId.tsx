import { createFileRoute } from "@tanstack/react-router";
import { BookingDetailPage } from "../../../pages/manage/BookingDetailPage";

export const Route = createFileRoute("/manage/reservations/$reservationId")({
  component: () => <BookingDetailPage />,
});
