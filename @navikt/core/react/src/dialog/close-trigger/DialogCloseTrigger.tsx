import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useDialogContext } from "../root/DialogRoot.context";

interface DialogCloseTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link DialogCloseTriggerProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.CloseTrigger>
 *        <Button>Close dialog</Button>
 *      </Dialog.CloseTrigger>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  DialogCloseTriggerProps
>(({ children, onClick, ...restProps }, forwardedRef) => {
  const { open, setOpen } = useDialogContext();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (open) {
      setOpen(false, event.nativeEvent);
    }
  };

  return (
    <Slot
      type="button"
      {...restProps}
      ref={forwardedRef}
      onClick={composeEventHandlers(onClick, handleClick)}
    >
      {children}
    </Slot>
  );
});

export { DialogCloseTrigger };
export type { DialogCloseTriggerProps };
