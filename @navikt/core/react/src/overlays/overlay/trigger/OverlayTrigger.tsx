import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import { useOverlayContext } from "../root/OverlayRoot.context";

interface OverlayTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayTriggerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO:
 * - Button that triggers the overlay to open
 * - Can be any element, but should probably be a button for accessibility
 * - Should get back focus on close if `dialog` is used for overlay
 */
const OverlayTrigger = forwardRef<HTMLButtonElement, OverlayTriggerProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { open, setOpen, setTriggerElement } = useOverlayContext();

    const mergedRefs = useMergeRefs(forwardedRef, setTriggerElement);

    return (
      <button
        {...restProps}
        ref={mergedRefs}
        className={cn(className)}
        data-popup-open={open}
        onClick={(event) => setOpen(!open, event.nativeEvent)}
      >
        {children}
      </button>
    );
  },
);

export { OverlayTrigger };
export type { OverlayTriggerProps };
