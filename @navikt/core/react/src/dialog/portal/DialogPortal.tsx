import React, { forwardRef } from "react";
import { Portal } from "../../portal";
import { useRenameCSS } from "../../theme/Theme";
import { useDialogContext } from "../root/DialogRoot.context";

type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
type MenuPortalElement = React.ElementRef<typeof Portal>;

type DialogPortalProps = PortalProps & {
  children: React.ReactNode;
};

/**
 * @see 🏷️ {@link DialogPortalProps}
 * @example
 * ```jsx
 * ```
 */
const DialogPortal = forwardRef<MenuPortalElement, DialogPortalProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { mounted } = useDialogContext();

    if (!mounted) {
      return null;
    }

    return (
      <Portal {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </Portal>
    );
  },
);

export { DialogPortal };
export type { DialogPortalProps };
