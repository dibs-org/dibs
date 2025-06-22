import { createFileRoute } from "@tanstack/react-router";
import { ListingDetailPage } from "../../pages/listings/ListingDetailPage";

export const Route = createFileRoute("/listings/$listingId")({
  component: () => <ListingDetailPage />,
});
