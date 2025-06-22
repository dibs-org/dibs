import { createFileRoute } from "@tanstack/react-router";
import { EditListingPage } from "../../../pages/manage/EditListingPage";

export const Route = createFileRoute("/manage/listings/$listingId")({
  component: () => <EditListingPage listingId="1" />,
});
