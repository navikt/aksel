import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { cl } from "../../util/className";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @see 🏷️ {@link DialogDescriptionProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.Header>
 *        <Dialog.Title>Dialog title</Dialog.Title>
 *        <Dialog.Description>Dialog description</Dialog.Description>
 *      </Dialog.Header>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...restProps }, forwardedRef) => {
  const { size } = useDialogContext();

  return (
    <BodyShort
      {...restProps}
      ref={forwardedRef}
      className={cl("aksel-dialog__description", className)}
      size={size}
      data-color="neutral"
      textColor="subtle"
    >
      {children}
    </BodyShort>
  );
});

export { DialogDescription };
export type { DialogDescriptionProps };
