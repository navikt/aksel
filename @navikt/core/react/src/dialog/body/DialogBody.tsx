import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link DialogBodyProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.Body>
 *        Dialog body content
 *      </Dialog.Body>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn("navds-dialog__body", className)}
      >
        {children}
      </div>
    );
  },
);

export { DialogBody };
export type { DialogBodyProps };
