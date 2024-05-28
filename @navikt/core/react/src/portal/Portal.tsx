import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { SlottedElement } from "../slot/SlottedElement";
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

    return root
      ? ReactDOM.createPortal(
          <SlottedElement
            as="div"
            ref={ref}
            data-aksel-portal=""
            asChild={asChild}
            {...rest}
          />,
          root,
        )
      : null;
  },
);

export default Portal;
