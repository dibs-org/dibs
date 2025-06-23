import { createFileRoute } from "@tanstack/react-router";
import { MyReservationsListPage } from "../../pages/reservations/MyReservationsListPage";

export const Route = createFileRoute("/reservations/")({
  component: () => (
    <div className="min-h-[calc(100vh-100px)] w-full max-w-[1000px] mx-auto flex justify-center p-4">
      <MyReservationsListPage />
    </div>
  ),
});
