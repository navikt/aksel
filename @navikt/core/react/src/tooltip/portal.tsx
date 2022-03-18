/* https://github.com/radix-ui/primitives/blob/main/packages/react/portal/src/Portal.tsx */
import * as React from "react";
import ReactDOM from "react-dom";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.RefObject<HTMLElement>;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ containerRef, style, ...rest }, ref) => {
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
      return ReactDOM.createPortal(
        <div
          {...rest}
          data-tooltip=""
          ref={ref}
          style={
            /**
             * If the Portal is injected in `body`, we assume we want whatever is portalled
             * to appear on top of everything. Ideally this would be handled by making sure the
             * app root creates a new stacking context, however this is quite hard to automate.
             * For this reason, we have opted for setting the max z-index on the portal itself.
             */
            hostElement === document.body
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2147483647,
                  ...style,
                }
              : undefined
          }
        />,
        hostElement
      );
    }

    // bail out of ssr
    return null;
  }
);

export default Portal;
