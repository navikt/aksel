import React, { forwardRef } from "react";
import { DialogBackdrop } from "../backdrop/DialogBackdrop";
import { DialogPortal, type DialogPortalProps } from "../portal/DialogPortal";
import {
  DialogPopupInternal,
  type DialogPopupInternalProps,
} from "./DialogPopupInternal";

interface DialogPopupProps
  extends DialogPopupInternalProps,
    Pick<DialogPortalProps, "rootElement"> {
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
  ({ hasBackdrop = true, rootElement, ...restProps }, forwardedRef) => {
    return (
      <DialogPortal rootElement={rootElement}>
        {hasBackdrop && <DialogBackdrop />}
        <DialogPopupInternal ref={forwardedRef} {...restProps} />
      </DialogPortal>
    );
  },
);

export { DialogPopup };
export type { DialogPopupProps };
