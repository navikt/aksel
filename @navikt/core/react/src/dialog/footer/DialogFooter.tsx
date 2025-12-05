import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link DialogFooterProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.Footer>
 *        <Dialog.CloseTrigger>
 *          <Button>Close dialog</Button>
 *        </Dialog.CloseTrigger>
 *      </Dialog.Footer>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn("navds-dialog__footer", className)}
      >
        {children}
      </div>
    );
  },
);

export { DialogFooter };
export type { DialogFooterProps };
