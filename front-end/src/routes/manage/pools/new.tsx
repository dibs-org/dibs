import { createFileRoute } from "@tanstack/react-router";
import { CreatePoolPage } from "../../../pages/manage/pools/CreatePoolPage";

export const Route = createFileRoute("/manage/pools/new")({
  component: () => <CreatePoolPage />,
});
