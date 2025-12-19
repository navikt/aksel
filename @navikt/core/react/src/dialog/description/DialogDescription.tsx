import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
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
  const { cn } = useRenameCSS();
  const { size } = useDialogContext();

  return (
    <BodyShort
      {...restProps}
      ref={forwardedRef}
      className={cn("navds-dialog__description", className)}
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
