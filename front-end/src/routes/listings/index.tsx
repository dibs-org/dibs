import { createFileRoute } from "@tanstack/react-router";
import { BrowseListingsPage } from "../../pages/listings/BrowseListingsPage";

export const Route = createFileRoute("/listings/")({
  component: () => <BrowseListingsPage />,
});
