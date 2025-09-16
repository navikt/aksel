import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { OverlayInternalBackdrop } from "../backdrop/OverlayInternalBackdrop";
import { useOverlayContext } from "../root/OverlayRoot.context";

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
    const { open } = useOverlayContext();

    return (
      <>
        {/* TODO: Use mounted-prop */}
        {open && (
          <OverlayInternalBackdrop /* ref={internalBackdropRef} inert={inertValue(!open)} */
          />
        )}
        <div
          {...restProps}
          ref={forwardedRef}
          className={cn(className)}
          /* Handle in CSS */
          style={{
            position: "fixed",
            width: "26rem",
            top: "50%",
            left: "50%",
            background: "gray",
            padding: 32,
          }}
        >
          {children}
        </div>
      </>
    );
  },
);

export { OverlayDrawer };
export type { OverlayDrawerProps };
