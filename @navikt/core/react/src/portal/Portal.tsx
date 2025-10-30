import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { PortalContext, usePortalNode } from "./usePortalNode";

interface PortalBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

export type PortalProps = PortalBaseProps;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, children, ...restProps }, forwardedRef) => {
    const { portalNode, portalSubtree } = usePortalNode({
      rootElement,
      ref: forwardedRef,
      props: restProps,
    });

    if (!portalSubtree && !portalNode) {
      return null;
    }

    return (
      <React.Fragment>
        {portalSubtree}
        {portalNode && (
          <PortalContext.Provider value={portalNode}>
            {ReactDOM.createPortal(children, portalNode)}
          </PortalContext.Provider>
        )}
      </React.Fragment>
    );
  },
);

export default Portal;
