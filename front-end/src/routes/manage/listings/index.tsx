import { createFileRoute } from "@tanstack/react-router";
import { ManageListingsPage } from "../../../pages/manage/listings/ManageListingsPage";

export const Route = createFileRoute("/manage/listings/")({
  component: () => <ManageListingsPage />,
});
