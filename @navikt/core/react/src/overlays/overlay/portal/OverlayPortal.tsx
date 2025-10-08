import React, { forwardRef } from "react";
import { Portal } from "../../../portal";
import { useRenameCSS } from "../../../theme/Theme";
import { useOverlayContext } from "../root/OverlayRoot.context";

type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
type MenuPortalElement = React.ElementRef<typeof Portal>;

type OverlayPortalProps = PortalProps & {
  children: React.ReactNode;
};

/**
 * @see 🏷️ {@link OverlayPortalProps}
 * @example
 * ```jsx
 * ```
 */
const OverlayPortal = forwardRef<MenuPortalElement, OverlayPortalProps>(
  ({ children, className, rootElement, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { mounted } = useOverlayContext();

    const shouldRender = mounted; /* || keepMounted */

    if (!shouldRender) {
      return null;
    }

    return (
      <Portal
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        rootElement={rootElement}
        asChild={false}
      >
        {children}
      </Portal>
    );
  },
);

export { OverlayPortal };
export type { OverlayPortalProps };
