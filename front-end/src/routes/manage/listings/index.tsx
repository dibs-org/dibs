import { createFileRoute } from "@tanstack/react-router";
import { ManageListingsPage } from "../../../pages/manage/ManageListingsPage";

export const Route = createFileRoute("/manage/listings/")({
  component: () => <ManageListingsPage />,
});
