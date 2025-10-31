import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { Heading } from "../../typography";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link DialogTitleProps}
 * @example
 * ```jsx
 * ```
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { size } = useDialogContext();

    return (
      <Heading
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__title")}
        size={size}
        level="1"
      >
        {children}
      </Heading>
    );
  },
);

export { DialogTitle };
export type { DialogTitleProps };
