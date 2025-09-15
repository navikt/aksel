import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";

interface OverlayDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayDrawerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Drawer that slides in from the side
 * - Implemented as `dialog`-element
 */
const OverlayDrawer = forwardRef<HTMLDivElement, OverlayDrawerProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

export { OverlayDrawer };
export type { OverlayDrawerProps };
