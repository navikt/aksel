import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link DialogFooterProps}
 * @example
 * ```jsx
 * ```
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__footer")}
      >
        {children}
      </div>
    );
  },
);

export { DialogFooter };
export type { DialogFooterProps };
