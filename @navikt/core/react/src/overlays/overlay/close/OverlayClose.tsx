import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useEventCallback } from "../hooks/useEventCallback";
import { useOverlayContext } from "../root/OverlayRoot.context";

interface OverlayCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
 * - Acts as close, but for close
 */
const OverlayClose = forwardRef<HTMLButtonElement, OverlayCloseProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { open, setOpen } = useOverlayContext();

    const handleClick = useEventCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.info("OverlayClose2: Closing overlay");
        if (open) {
          console.info("OverlayClose1: Closing overlay");
          setOpen(false, event.nativeEvent);
        }
      },
    );

    return (
      <button
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        data-popup-open={open}
        onClick={handleClick}
        /* TODO: Placeholder for testing */
        id="close"
      >
        {children}
      </button>
    );
  },
);

export { OverlayClose };
export type { OverlayCloseProps };
