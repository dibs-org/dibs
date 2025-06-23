import { createFileRoute } from "@tanstack/react-router";
import { OwnerDashboard } from "../../pages/manage/OwnerDashboard";

export const Route = createFileRoute("/manage/")({
  component: () => <OwnerDashboard />,
});
