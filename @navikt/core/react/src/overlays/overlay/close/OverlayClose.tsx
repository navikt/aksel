import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
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

    /* TODO: Put into useEventCallback */
    const handleClick = () => {
      if (open) {
        setOpen(false);
      }
    };

    return (
      <button
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        data-popup-open={open}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);

export { OverlayClose };
export type { OverlayCloseProps };
