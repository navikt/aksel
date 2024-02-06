import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../../provider";
import { Slot } from "../../util/Slot";
import { WithAsChild } from "../../util/types";

interface PortalBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

export type PortalProps = PortalBaseProps & WithAsChild;

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
