import { createFileRoute } from "@tanstack/react-router";
import { CreateListingPage } from "../../../pages/manage/listings/CreateListingPage";

export const Route = createFileRoute("/manage/listings/new")({
  component: () => <CreateListingPage />,
});
