import { createFileRoute } from "@tanstack/react-router";
import { BookingsPage } from "../../../pages/manage/BookingsPage";

export const Route = createFileRoute("/manage/reservations/")({
  component: () => <BookingsPage />,
});
