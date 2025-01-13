import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@navikt/ds-react/Theme";
// import { Theme } from "../../../../@navikt/core/react";
import "./index.css";
import { routeTree } from "./routeTree.gen";

// import { ThemeProvider } from "./theme/ThemeProvider";

const router = createRouter({ routeTree, trailingSlash: "always" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Theme theme="dark">
        <RouterProvider router={router} />
      </Theme>
    </StrictMode>,
  );
}
