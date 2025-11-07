import React, { forwardRef } from "react";
import { Portal, type PortalProps } from "../../portal";
import { DialogBackdrop } from "../backdrop/DialogBackdrop";
import { useDialogContext } from "../root/DialogRoot.context";
import {
  DialogPopupInternal,
  type DialogPopupInternalProps,
} from "./DialogPopupInternal";

interface DialogPopupProps
  extends DialogPopupInternalProps,
    Pick<PortalProps, "rootElement"> {
  children: React.ReactNode;
  /**
   * Adds a backdrop behind the dialog popup.
   * @default true
   */
  hasBackdrop?: boolean;
}

/**
 * @see 🏷️ {@link DialogPopupProps}
 * @example
 * ```jsx
 * ```
 */
const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  (
    { hasBackdrop = true, rootElement, position, ...restProps },
    forwardedRef,
  ) => {
    const { mounted } = useDialogContext();

    if (!mounted) {
      return null;
    }

    return (
      <Portal rootElement={rootElement}>
        {hasBackdrop && position !== "fullscreen" && <DialogBackdrop />}
        <DialogPopupInternal
          ref={forwardedRef}
          {...restProps}
          position={position}
        />
      </Portal>
    );
  },
);

export { DialogPopup };
export type { DialogPopupProps };
