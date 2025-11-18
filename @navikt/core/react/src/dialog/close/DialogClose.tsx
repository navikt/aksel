import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
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
  ({ children, asChild = false, ...restProps }, forwardedRef) => {
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
        onClick={handleClick}
      >
        {children}
      </Component>
    );
  },
);

export { DialogClose };
export type { DialogCloseProps };
