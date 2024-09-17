import {
  Link,
  Outlet,
  ReactNode,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RouteLink = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <Link to={to} className="[&.active]:border border-black rounded m-2 p-2">
      {children}
    </Link>
  );
};

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex w-[100vw] m-[calc(0 - 50%)] gap-6">
        <RouteLink to="/sykepenger">Sykepenger</RouteLink>{" "}
        <RouteLink to="/minside">Min Side</RouteLink>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
