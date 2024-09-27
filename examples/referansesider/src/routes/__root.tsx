import {
  ErrorComponent,
  Link,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { RouteMapper } from "../components/RouteMapper";
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

const ScHeader = styled.header`
  border-bottom: 1px solid ${tokens.BorderSubtle};
`;

const ScRouteLink = styled(Link)`
  &[aria-current="page"] {
    background-color: ${tokens.BgRaised};
    text-decoration: underline;
  }
`;

const ScUl = styled.ul`
  background-color: ${tokens.BgSunken};
`;

export const Route = createRootRoute({
  errorComponent: ErrorComponent,
  component: () => (
    <>
      <ScHeader className="p-2 px-4 flex mx-auto items-center gap-6 max-w-screen-2xl">
        <ScUl className="inline-flex items-center gap-1 justify-center h-12 rounded px-1">
          <RouteMapper>
            {(path, name) => (
              <li key={path}>
                <ScRouteLink
                  to={path}
                  className="rounded capitalize p-2 underline-offset-2"
                >
                  {name}
                </ScRouteLink>
              </li>
            )}
          </RouteMapper>
        </ScUl>
        <div className="ml-auto h-fit">
          <ThemeSwitch />
        </div>
      </ScHeader>

      <div className="overflow-x-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
