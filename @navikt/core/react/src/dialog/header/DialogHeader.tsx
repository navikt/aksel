import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

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

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__header")}
      >
        {children}
      </div>
    );
  },
);

export { DialogHeader };
export type { DialogHeaderProps };
