import { createFileRoute } from "@tanstack/react-router";
import { ManageReservationsListPage } from "../../../pages/manage/reservations/ManageReservationsListPage";

export const Route = createFileRoute("/manage/reservations/")({
  component: () => <ManageReservationsListPage />,
});
