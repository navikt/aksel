import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";

interface OverlayCloseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayCloseProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Closes overlay on click.
 * - Closebutton
 * - Acts as trigger, but for close
 */
const OverlayClose = forwardRef<HTMLDivElement, OverlayCloseProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

export { OverlayClose };
export type { OverlayCloseProps };
