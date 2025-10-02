import React, { forwardRef } from "react";
import { Slot } from "../../../slot/Slot";
import { useRenameCSS } from "../../../theme/Theme";
import type { AsChild } from "../../../util/types/AsChild";
import { useEventCallback } from "../hooks/useEventCallback";
import { useOverlayContext } from "../root/OverlayRoot.context";

type OverlayCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChild;

/**
 * @see 🏷️ {@link OverlayCloseProps}
 * @example
 * ```jsx
 * ```
 */
const OverlayClose = forwardRef<HTMLButtonElement, OverlayCloseProps>(
  ({ children, className, asChild = false, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { open, setOpen } = useOverlayContext();

    const handleClick = useEventCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (open) {
          setOpen(false, event.nativeEvent);
        }
      },
    );

    const Component = asChild ? Slot : "button";

    return (
      <Component
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        data-popup-open={open}
        onClick={handleClick}
      >
        {children}
      </Component>
    );
  },
);

export { OverlayClose };
export type { OverlayCloseProps };
