import { createFileRoute } from "@tanstack/react-router";
import { ManageReservationsListPage } from "../../../pages/manage/ManageReservationsListPage";

export const Route = createFileRoute("/manage/reservations/")({
  component: () => (
    <div className="min-h-[calc(100vh-100px)] w-full max-w-[1000px] mx-auto flex justify-center p-4">
      <ManageReservationsListPage />
    </div>
  ),
});
