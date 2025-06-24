import { createFileRoute } from "@tanstack/react-router";
import { EditPoolPage } from "../../../pages/manage/pools/EditPoolPage";

export const Route = createFileRoute("/manage/pools/$poolId")({
  component: () => <EditPoolPage />,
});
