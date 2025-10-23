import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link DialogBodyProps}
 * @example
 * ```jsx
 * ```
 */
const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__body")}
      >
        {children}
      </div>
    );
  },
);

export { DialogBody };
export type { DialogBodyProps };
