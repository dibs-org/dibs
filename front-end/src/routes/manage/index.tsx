import { createFileRoute } from "@tanstack/react-router";
import { OwnerDashboard } from "../../pages/manage/OwnerDashboard";

export const Route = createFileRoute("/manage/")({
  component: OwnerLayout,
});

function OwnerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Pool Owner Dashboard
              </h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <OwnerDashboard />
      </main>
    </div>
  );
}
