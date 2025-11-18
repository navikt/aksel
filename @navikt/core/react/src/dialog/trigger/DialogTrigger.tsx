import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import type { AsChild } from "../../util/types/AsChild";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChild;

/**
 * @see 🏷️ {@link DialogTriggerProps}
 * @example
 * ```jsx
 * ```
 */
const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild = false, onClick, ...restProps }, forwardedRef) => {
    const { open, setOpen, setTriggerElement, popupId } = useDialogContext();

    const mergedRefs = useMergeRefs(forwardedRef, setTriggerElement);

    const Component = asChild ? Slot : "button";

    return (
      <Component
        type="button"
        {...restProps}
        ref={mergedRefs}
        onClick={composeEventHandlers(onClick, (event) =>
          setOpen(!open, event.nativeEvent),
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popupId : undefined}
      >
        {children}
      </Component>
    );
  },
);

export { DialogTrigger };
export type { DialogTriggerProps };
