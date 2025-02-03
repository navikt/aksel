import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import React from "react";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/darkside-js";
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

export const Route = createRootRoute({
  errorComponent: ErrorComponent,
  component: () => (
    <>
      <ScHeader className="p-2 px-4 flex mx-auto items-center gap-6 max-w-screen-2xl">
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
