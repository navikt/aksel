import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { Heading } from "../../typography";

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link DialogTitleProps}
 * @example
 * ```jsx
 * ```
 * TODO: Handle size
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Heading
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__title")}
        size="medium"
        level="1"
      >
        {children}
      </Heading>
    );
  },
);

export { DialogTitle };
export type { DialogTitleProps };
