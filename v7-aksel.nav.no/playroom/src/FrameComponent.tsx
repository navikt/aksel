import * as React from "react";
import "@navikt/ds-css";
import "./frameComponent.css";

const FrameComponent = ({ children }: { children: React.ReactNode }) => {
  return <div id="sandbox-wrapper">{children}</div>;
};

export default FrameComponent;
