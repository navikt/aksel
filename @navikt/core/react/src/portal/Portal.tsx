import { HTMLAttributes, forwardRef } from "react";
import { usePortalNode } from "./usePortalNode";

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, children, ...restProps }, forwardedRef) => {
    const { portalNode, portalSubtree } = usePortalNode({
      rootElement,
      ref: forwardedRef,
      props: restProps,
      children,
    });

    if (!portalSubtree && !portalNode) {
      return null;
    }

    return portalSubtree;
  },
);

export default Portal;
