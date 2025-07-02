import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  user: User | null;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-medium">
          Home
        </Link>{" "}
        <Link to="/reserve" className="[&.active]:font-medium">
          Reserve
        </Link>
      </div>
      <hr /> */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
