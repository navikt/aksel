import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { Slot } from "../util/Slot";
import { AsChildProps } from "../util/types";

interface PortalBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

export type PortalProps = PortalBaseProps & AsChildProps;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, asChild, ...rest }, ref) => {
    const contextRoot = useProvider()?.rootElement;
    const root = rootElement ?? contextRoot ?? globalThis?.document?.body;

    const Component = asChild ? Slot : "div";

    return root
      ? ReactDOM.createPortal(
          <Component ref={ref} data-aksel-portal="" {...rest} />,
          root,
        )
      : null;
  },
);

export default Portal;
