import { createFileRoute } from "@tanstack/react-router";
import { EditListingPage } from "../../pages/manage/listings/EditListingPage";

export const Route = createFileRoute("/manage/listing")({
  component: RouteComponent,
  loader() {
    return { listingId: 1 };
  },
});

function RouteComponent() {
  return <EditListingPage listingId="1" />;
}
