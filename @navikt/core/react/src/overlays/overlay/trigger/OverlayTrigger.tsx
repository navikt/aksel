import React, { forwardRef } from "react";
import { Slot } from "../../../slot/Slot";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import type { AsChild } from "../../../util/types/AsChild";
import { useOverlayContext } from "../root/OverlayRoot.context";

type OverlayTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChild;

/**
 * @see 🏷️ {@link OverlayTriggerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO:
 * - Button that triggers the overlay to open
 * - Should get back focus on close if `dialog` is used for overlay
 */
const OverlayTrigger = forwardRef<HTMLButtonElement, OverlayTriggerProps>(
  ({ children, className, asChild = false, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { open, setOpen, setTriggerElement } = useOverlayContext();

    const mergedRefs = useMergeRefs(forwardedRef, setTriggerElement);

    const Component = asChild ? Slot : "button";

    return (
      <Component
        {...restProps}
        ref={mergedRefs}
        className={cn(className)}
        data-popup-open={open}
        onClick={(event) => setOpen(!open, event.nativeEvent)}
      >
        {children}
      </Component>
    );
  },
);

export { OverlayTrigger };
export type { OverlayTriggerProps };
