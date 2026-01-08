import * as React from "react";
import "@navikt/ds-css";

const FrameComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="sandbox-wrapper" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
};

export default FrameComponent;
