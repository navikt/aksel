import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
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
  ({ children, asChild = false, onClick, ...restProps }, forwardedRef) => {
    const { open, setOpen } = useDialogContext();

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (open) {
        setOpen(false, event.nativeEvent);
      }
    };

    const Component = asChild ? Slot : "button";

    return (
      <Component
        type="button"
        {...restProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        {children}
      </Component>
    );
  },
);

export { DialogClose };
export type { DialogCloseProps };
