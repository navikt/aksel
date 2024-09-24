import {
  Link,
  Outlet,
  ReactNode,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";

const RouteLink = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <Link to={to} className="[&.active]:border border-black rounded m-2 p-2">
      {children}
    </Link>
  );
};

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
  component: () => (
    <>
      <div className="p-2 flex gap-6">
        <RouteLink to="/sykepenger">Sykepenger</RouteLink>
        <RouteLink to="/minside">Min Side</RouteLink>
        <RouteLink to="/komponenter">Komponenter</RouteLink>
      </div>
      <hr />
      <div className="overflow-x-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
