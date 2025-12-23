import * as React from "react";
import "@navikt/ds-css";
import { Theme } from "@navikt/ds-react/Theme";

const FrameComponent = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
}) => {
  return (
    <Theme theme={theme} asChild>
      <div id="sandbox-wrapper" style={{ height: "100vh" }}>
        {children}
      </div>
    </Theme>
  );
};

export default FrameComponent;
