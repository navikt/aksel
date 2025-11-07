import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import { useI18n } from "../../util/i18n/i18n.hooks";
import type { AsChild } from "../../util/types/AsChild";
import { DialogClose } from "../close/DialogClose";

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  AsChild & {
    /**
     * Whether to show a close button in the header.
     * Will trigger `onOpenChange` when clicked.
     * @default true
     */
    hasCloseButton?: boolean;
  };

/**
 * @see 🏷️ {@link DialogHeaderProps}
 * @example
 * ```jsx
 * ```
 */
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    { className, children, hasCloseButton = true, asChild, ...restProps },
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const translate = useI18n("global");

    const Component = asChild ? Slot : "div";

    return (
      <>
        <Component
          {...restProps}
          ref={forwardedRef}
          className={cn(className, "navds-dialog__header")}
        >
          {children}
        </Component>
        {hasCloseButton && (
          <DialogClose asChild>
            <Button
              type="button"
              className={cn("navds-dialog__close-button")}
              size="small"
              variant="tertiary-neutral"
              icon={<XMarkIcon title={translate("close")} />}
            />
          </DialogClose>
        )}
      </>
    );
  },
);

export { DialogHeader };
export type { DialogHeaderProps };
