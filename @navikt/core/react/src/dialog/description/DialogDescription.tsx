import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @see 🏷️ {@link DialogDescriptionProps}
 * @example
 * ```jsx
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
      className={cn(className, "navds-dialog__description")}
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
