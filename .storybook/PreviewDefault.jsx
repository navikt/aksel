import { useLayoutEffect } from "react";
import defaultCss from "@navikt/ds-css/index.css?inline";

export const DefaultDekorator = ({ children }) => {
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = defaultCss;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);
  return children;
};
