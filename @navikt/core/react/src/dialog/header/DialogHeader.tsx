import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { DialogClose } from "../close/DialogClose";

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link DialogHeaderProps}
 * @example
 * ```jsx
 * ```
 */
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const translate = useI18n("global");

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__header")}
      >
        <DialogClose asChild>
          <Button
            type="button"
            className={cn("navds-dialog__close-button")}
            size="small"
            variant="tertiary-neutral"
            icon={<XMarkIcon title={translate("close")} />}
          />
        </DialogClose>
        {children}
      </div>
    );
  },
);

export { DialogHeader };
export type { DialogHeaderProps };
