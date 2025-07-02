import { createFileRoute } from "@tanstack/react-router";
import { LoginPhonePage } from "../pages/auth/LoginPhonePage";
import { z } from "zod/v4";

export const Route = createFileRoute("/login-phone")({
  component: () => <LoginPhonePage />,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
});
