import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @see 🏷️ {@link DialogDescriptionProps}
 * @example
 * ```jsx
 * ```
 * TODO: Handle size
 */
const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...restProps }, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <BodyShort
      {...restProps}
      ref={forwardedRef}
      className={cn(className, "navds-dialog__description")}
      size="medium"
      data-color="neutral"
      textColor="subtle"
    >
      {children}
    </BodyShort>
  );
});

export { DialogDescription };
export type { DialogDescriptionProps };
