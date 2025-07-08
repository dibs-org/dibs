import { createFileRoute, Link } from "@tanstack/react-router";
import AuthDropdown from "../components/AuthDropdown";
import { useAuth } from "../AuthProvider";
import DashboardPage from "../pages/dashboard/DashboardPage";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  return (
    <div className="min-min-h-screen">
      <nav className="bg-surface border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center h-16 gap-10">
            <div className="flex items-center">
              <Link to={user ? "/dashboard" : "/"}>
                <h1 className="text-xl font-semibold">Dibs</h1>
              </Link>
            </div>
            <div className="hidden md:flex gap-2 items-center">
              <Link to="/reservations">Reservations</Link>
            </div>
          </div>
          <AuthDropdown />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <DashboardPage />
      </main>
    </div>
  );
}
