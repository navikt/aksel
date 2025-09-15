import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";

interface OverlayPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

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
const OverlayPortal = forwardRef<HTMLDivElement, OverlayPortalProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

export { OverlayPortal };
export type { OverlayPortalProps };
