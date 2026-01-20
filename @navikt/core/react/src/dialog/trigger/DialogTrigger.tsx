import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement;
};

/**
 * @see 🏷️ {@link DialogTriggerProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Trigger>
 *      <Button>Open dialog</Button>
 *    </Dialog.Trigger>
 *  </Dialog>
 * ```
 */
const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...restProps }, forwardedRef) => {
    const { open, setOpen, setTriggerElement, popupId } = useDialogContext();

    const mergedRefs = useMergeRefs(forwardedRef, setTriggerElement);

    return (
      <Slot
        type="button"
        {...restProps}
        ref={mergedRefs}
        onClick={composeEventHandlers(onClick, (event) =>
          setOpen(!open, event.nativeEvent),
        )}
        aria-haspopup="dialog"
        aria-controls={open ? popupId : undefined}
      >
        {children}
      </Slot>
    );
  },
);

export { DialogTrigger };
export type { DialogTriggerProps };
