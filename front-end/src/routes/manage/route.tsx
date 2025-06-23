import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/manage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <nav className="bg-surface border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-10">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-xl font-semibold">Dibs</h1>
              </Link>
            </div>
            <div className="flex gap-6 items-center">
              <Link
                to="/manage"
                inactiveProps={{ className: `text-gray-500` }}
                activeOptions={{ exact: true }}
              >
                Manage
              </Link>
              <Link
                to="/manage/listings"
                inactiveProps={{ className: `text-gray-500` }}
              >
                Listings
              </Link>
              <Link
                to="/manage/reservations"
                inactiveProps={{ className: `text-gray-500` }}
              >
                Reservations
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
