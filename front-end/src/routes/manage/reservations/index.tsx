import { createFileRoute } from "@tanstack/react-router";
import { ReservationsPage } from "../../../pages/manage/ReservationsPage";

export const Route = createFileRoute("/manage/reservations/")({
  component: () => <ReservationsPage />,
});
