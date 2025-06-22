import { createFileRoute } from "@tanstack/react-router";
import { ReservationsPage } from "../../pages/reservations/ReservationsPage";

export const Route = createFileRoute("/reservations/")({
  component: () => <ReservationsPage />,
});
