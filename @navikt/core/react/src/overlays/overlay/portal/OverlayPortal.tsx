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
/**
 * TODO: Renders overlay in a portal (at the end of the DOM), and acts as a wrapper
 * - Needs to use Provider context for Portal-node to attach to
 */
const OverlayPortal = forwardRef<MenuPortalElement, OverlayPortalProps>(
  ({ children, className, rootElement, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { open } = useOverlayContext();

    /* const { mounted } = useDialogContext();

    const shouldRender = mounted || keepMounted;

     */

    const shouldRender = open;

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
