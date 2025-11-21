import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import type { AsChild } from "../../util/types/AsChild";

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & AsChild;

/**
 * @see 🏷️ {@link DialogFooterProps}
 * @example
 * ```jsx
 * ```
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, asChild, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const Component = asChild ? Slot : "div";

    return (
      <Component
        {...restProps}
        ref={forwardedRef}
        className={cn("navds-dialog__footer", className)}
      >
        {children}
      </Component>
    );
  },
);

export { DialogFooter };
export type { DialogFooterProps };
