import { useLayoutEffect } from "react";
import darksideCss from "@navikt/ds-css/darkside/index.css?inline";

export const DarkSideDekorator = ({ children }) => {
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = darksideCss;
    document.head.appendChild(style);

    document.body.style.setProperty("background", "var(--a-bg-default)");
    return () => {
      document.head.removeChild(style);
      document.body.style.removeProperty("background");
    };
  }, []);

  return children;
};
