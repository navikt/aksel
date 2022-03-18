/* https://github.com/radix-ui/primitives/blob/main/packages/react/portal/src/Portal.tsx */
import * as React from "react";
import ReactDOM from "react-dom";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.RefObject<HTMLElement>;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ containerRef, children, style, ...rest }, ref) => {
    const hostElement = containerRef?.current ?? globalThis?.document?.body;
    const [, forceUpdate] = React.useState({});

    /**
     * containerRef.current won't be set on first render, so we force a re-render.
     * Because we do this in `useLayoutEffect`, we still avoid a flash.
     */
    useLayoutEffect(() => {
      forceUpdate({});
    }, []);

    if (hostElement) {
      return ReactDOM.createPortal(children, hostElement);
    }

    // bail out of ssr
    return null;
  }
);

export default Portal;
