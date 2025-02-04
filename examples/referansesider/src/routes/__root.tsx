import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";
import { ThemeSwitch } from "../theme/ThemeSwitch";

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
      <header className="p-2 px-4 flex mx-auto items-center gap-6 max-w-screen-2xl">
        <div className="ml-auto h-fit">
          <ThemeSwitch />
        </div>
      </header>
      <div className="overflow-x-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
