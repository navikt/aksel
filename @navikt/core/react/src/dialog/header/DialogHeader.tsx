import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { DialogCloseTrigger } from "../close-trigger/DialogCloseTrigger";

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a close button in the header.
   * Will trigger `onOpenChange` when clicked.
   * @default true
   */
  withClosebutton?: boolean;
}

/**
 * @see 🏷️ {@link DialogHeaderProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.Header>
 *        <Dialog.Title>Dialog title</Dialog.Title>
 *      </Dialog.Header>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    { className, children, withClosebutton = true, ...restProps },
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const translate = useI18n("global");

    return (
      <>
        <div
          {...restProps}
          ref={forwardedRef}
          className={cn("navds-dialog__header", className)}
        >
          {withClosebutton && (
            <DialogCloseTrigger>
              <Button
                type="button"
                className={cn("navds-dialog__close-button")}
                size="small"
                variant="tertiary-neutral"
                icon={<XMarkIcon title={translate("close")} />}
              />
            </DialogCloseTrigger>
          )}
          {children}
        </div>
      </>
    );
  },
);

export { DialogHeader };
export type { DialogHeaderProps };
