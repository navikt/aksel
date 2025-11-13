import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import { useEventCallback } from "../../util/hooks/useEventCallback";
import type { AsChild } from "../../util/types/AsChild";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & AsChild;

/**
 * @see 🏷️ {@link DialogCloseProps}
 * @example
 * ```jsx
 * ```
 */
const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className, asChild = false, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { open, setOpen } = useDialogContext();

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
        type="button"
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

export { DialogClose };
export type { DialogCloseProps };
