import { createFileRoute } from "@tanstack/react-router";
import { LoginPhonePage } from "../pages/auth/LoginPhonePage";

export const Route = createFileRoute("/login-phone")({
  component: () => <LoginPhonePage />,
});
