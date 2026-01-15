import React, { forwardRef } from "react";
import { cl } from "../../util/className";

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
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-dialog__footer", className)}
      >
        {children}
      </div>
    );
  },
);

export { DialogFooter };
export type { DialogFooterProps };
