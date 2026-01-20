import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

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
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-dialog__body", className)}
      >
        {children}
      </div>
    );
  },
);

export { DialogBody };
export type { DialogBodyProps };
