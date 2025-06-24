import { createFileRoute } from "@tanstack/react-router";
import { ManagePoolsPage } from "../../../pages/manage/pools/ManagePoolsPage";

export const Route = createFileRoute("/manage/pools/")({
  component: () => <ManagePoolsPage />,
});
