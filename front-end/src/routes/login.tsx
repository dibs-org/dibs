import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../pages/auth/LoginPage";
import { z } from "zod/v4";

export const Route = createFileRoute("/login")({
  component: () => <LoginPage />,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
});
