import { createFileRoute } from "@tanstack/react-router";
import { CreateListingPage } from "../../../pages/manage/CreateListingPage";

export const Route = createFileRoute("/manage/listings/new")({
  component: () => <CreateListingPage />,
});
