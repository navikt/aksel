import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";

type DialogTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @see 🏷️ {@link DialogTitleProps}
 * @example
 * ```jsx
 * ```
 * TODO: Handle size
 */
const DialogTitle = forwardRef<HTMLParagraphElement, DialogTitleProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <BodyShort
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__title")}
        size="medium"
        data-color="neutral"
        textColor="subtle"
      >
        {children}
      </BodyShort>
    );
  },
);

export { DialogTitle };
export type { DialogTitleProps };
