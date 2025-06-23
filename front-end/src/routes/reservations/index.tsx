import { createFileRoute } from "@tanstack/react-router";
import { MyReservationsListPage } from "../../pages/reservations/MyReservationsListPage";

export const Route = createFileRoute("/reservations/")({
  component: () => <MyReservationsListPage />,
});
