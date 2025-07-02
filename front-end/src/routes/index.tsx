import { createFileRoute, Link } from "@tanstack/react-router";
import Heading from "../components/Heading";
import LinkButton from "../components/LinkButton";

export const Route = createFileRoute("/")({
  component: Index,
  // beforeLoad: ({ context, location }) => {
  //   if (!context.user) {
  //     throw redirect({
  //       to: "/reservations",
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
});

function Index() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
        <div className="flex flex-col gap-2 items-center">
          <img
            src="pool-emoji.png"
            alt="dibs"
            className="w-14 h-14 mb-2 fade-in-up"
          />
          <div className="flex flex-col items-center gap-1">
            <Heading
              as="h1"
              size="4xl"
              className="fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              dibs
            </Heading>
            <p
              className="text-center text-gray-600 dark:text-gray-400 fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Your swim, your schedule.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <LinkButton
            to="/login"
            variant="primary"
            className="fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Log in with email
          </LinkButton>
          <LinkButton
            to="/login-phone"
            className="fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Log in with phone
          </LinkButton>
        </div>
        <p
          className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
