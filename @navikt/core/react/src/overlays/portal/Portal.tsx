import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../../provider";
import { Slot } from "../../util/Slot";

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
  /**
   * When true, Portal will render as its child. This merges classes, styles and event handlers.
   */
  asChild?: boolean;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, asChild, ...rest }, ref) => {
    const contextRoot = useProvider()?.rootElement;
    const _rootContainer =
      rootElement ?? contextRoot ?? globalThis?.document?.body;

    const Component = asChild ? Slot : "div";

    return _rootContainer
      ? ReactDOM.createPortal(
          <Component ref={ref} data-aksel-portal="" {...rest} />,
          _rootContainer,
        )
      : null;
  },
);

export default Portal;
