import "@navikt/ds-css";
import * as React from "react";

const FrameComponent = ({ children }: { children: React.ReactNode }) => {
  return <div id="sandbox-wrapper">{children}</div>;
};

export default FrameComponent;
