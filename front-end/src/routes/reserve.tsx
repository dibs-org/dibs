import { createFileRoute, Link } from "@tanstack/react-router";
import { ReservationForm } from "../pages/reserve/ReservationForm";

export const Route = createFileRoute("/reserve")({
  component: () => (
    <div className="min-w-screen min-h-[calc(100vh-100px)] flex flex-col items-center justify-start p-4 pb-[78px]">
      <div className="flex gap-4 w-full justify-between">
        <Link to="/" className="text-gray-500">
          Back
        </Link>
      </div>
      <ReservationForm listingId="1" />
      <div />
    </div>
  ),
});
