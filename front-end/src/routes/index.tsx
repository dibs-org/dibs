import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h3>Home</h3>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <br />
        <span className="text-sm text-gray-500">Owner</span>
        <Link to="/manage">Owner dashboard</Link>
        <Link to="/manage/listings">Manage listings</Link>
        <Link to="/manage/listings/new">Create listing</Link>
        <Link to="/manage/reservations">Manage reservations</Link>
        <br />
        <span className="text-sm text-gray-500">Renter</span>
        <Link to="/reserve">Reserve</Link>
        <Link to="/listings">Browse listings (future)</Link>
        <Link to="/listings/$listingId" params={{ listingId: "1" }}>
          Listing details (future)
        </Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/reservations/$reservationId" params={{ reservationId: "1" }}>
          Reservation details
        </Link>
      </div>
    </div>
  );
}
