import {
  ErrorComponent,
  Link,
  Outlet,
  ReactNode,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { ThemeSwitch } from "../theme/ThemeSwitch";

const ScRouteLink = styled(Link)`
  &[aria-current="page"] {
    background-color: ${tokens.BgRaised};
    text-decoration: underline;
  }
`;

const ScUl = styled.ul`
  background-color: ${tokens.BgSunken};
`;

const RouteLink = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <ScRouteLink to={to} className="rounded p-2 underline-offset-2">
      {children}
    </ScRouteLink>
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
  errorComponent: ErrorComponent,
  component: () => (
    <>
      <header className="p-2 px-4 flex mx-auto items-center gap-6 max-w-screen-2xl">
        <ScUl className="inline-flex items-center gap-1 justify-center h-12 rounded px-1">
          <li>
            <RouteLink to="/sykepenger">Sykepenger</RouteLink>
          </li>
          <li>
            <RouteLink to="/minside">Min Side</RouteLink>
          </li>
          <li>
            <RouteLink to="/komponenter">Komponenter</RouteLink>
          </li>
        </ScUl>
        <div className="ml-auto h-fit">
          <ThemeSwitch />
        </div>
      </header>
      <hr />
      <div className="overflow-x-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
