import { createFileRoute } from "@tanstack/react-router";
import { BrowsePoolsPage } from "../../pages/pools/BrowsePoolsPage";

export const Route = createFileRoute("/pools/")({
  component: () => <BrowsePoolsPage />,
});
