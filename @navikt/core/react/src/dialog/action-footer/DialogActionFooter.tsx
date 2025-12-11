import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

type DialogActionFooterProps = React.HTMLAttributes<HTMLDivElement> & {};

/**
 * @see 🏷️ {@link DialogActionFooterProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.ActionFooter
 *        actions={{
 *          primary: <Button>Send</Button>,
 *          secondary: <Button variant="secondary">Cancel</Button>,
 *          tertiary: <Button variant="tertiary">Back</Button>,
 *        }}
 *      />
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogActionFooter = forwardRef<HTMLDivElement, DialogActionFooterProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(
          "navds-dialog__footer",
          "navds-dialog__action-footer",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

export { DialogActionFooter };
export type { DialogActionFooterProps };
