import { createFileRoute } from "@tanstack/react-router";
import { ListingsPage } from "../../../pages/manage/ListingsPage";

export const Route = createFileRoute("/manage/listings/")({
  component: () => <ListingsPage />,
});
