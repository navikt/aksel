import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRoute({
  errorComponent: ErrorComponent,
  component: () => (
    <>
      <div className="overflow-x-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
