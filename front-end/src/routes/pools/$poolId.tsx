import { createFileRoute } from "@tanstack/react-router";
import { PoolDetailPage } from "../../pages/pools/PoolDetailPage";

export const Route = createFileRoute("/pools/$poolId")({
  component: () => <PoolDetailPage />,
});
