import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "../pages/reserve/ReservationForm";

export const Route = createFileRoute("/reserve")({
  component: () => (
    <div className="min-w-screen min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <ReservationForm listingId="1" />
    </div>
  ),
});
