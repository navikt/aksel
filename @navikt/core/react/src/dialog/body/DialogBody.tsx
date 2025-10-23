import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import type { AsChild } from "../../util/types/AsChild";

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement> & AsChild;

/**
 * @see 🏷️ {@link DialogBodyProps}
 * @example
 * ```jsx
 * ```
 */
const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, asChild = false, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    const Component = asChild ? Slot : "div";

    return (
      <Component
        {...restProps}
        ref={forwardedRef}
        className={cn(className, "navds-dialog__body")}
      >
        {children}
      </Component>
    );
  },
);

export { DialogBody };
export type { DialogBodyProps };
