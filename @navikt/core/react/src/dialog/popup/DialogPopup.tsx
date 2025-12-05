import React, { forwardRef } from "react";
import { Portal, type PortalProps } from "../../portal";
import { DialogBackdropInternal } from "../backdrop/DialogBackdropInternal";
import { useDialogContext } from "../root/DialogRoot.context";
import {
  DialogPopupInternal,
  type DialogPopupInternalProps,
} from "./DialogPopupInternal";

type DialogPopupProps = DialogPopupInternalProps &
  Pick<PortalProps, "rootElement"> & {
    children: React.ReactNode;
  };

/**
 * @see 🏷️ {@link DialogPopupProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      ...
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  (
    {
      modal = true,
      withBackdrop = modal === true,
      rootElement,
      position,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { mounted, nested } = useDialogContext();

    if (!mounted) {
      return null;
    }

    return (
      <Portal rootElement={rootElement}>
        {withBackdrop && position !== "fullscreen" && !nested && (
          <DialogBackdropInternal />
        )}
        <DialogPopupInternal
          ref={forwardedRef}
          {...restProps}
          position={position}
          withBackdrop={withBackdrop && position !== "fullscreen"}
          modal={modal}
        />
      </Portal>
    );
  },
);

export { DialogPopup };
export type { DialogPopupProps };
