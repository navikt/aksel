import React, { forwardRef } from "react";
import { DialogBackdrop } from "../backdrop/DialogBackdrop";
import { DialogPortal } from "../portal/DialogPortal";
import {
  DialogPopupInternal,
  type DialogPopupInternalProps,
} from "./DialogPopupInternal";

interface DialogPopupProps extends DialogPopupInternalProps {
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
  ({ hasBackdrop = true, ...restProps }, forwardedRef) => {
    return (
      <DialogPortal>
        {hasBackdrop && <DialogBackdrop />}
        <DialogPopupInternal ref={forwardedRef} {...restProps} />
      </DialogPortal>
    );
  },
);

export { DialogPopup };
export type { DialogPopupProps };
