import React, { forwardRef } from "react";
import { Portal } from "../../portal";
import { useRenameCSS } from "../../theme/Theme";
import { useDialogContext } from "../root/DialogRoot.context";
import { useFloatingPortalNode } from "../usePortalNode";

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
  ({ children, className, rootElement, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { mounted } = useDialogContext();

    /**
     * Use a floating portal node to ensure that dialogs are rendered in correct order
     * when multiple dialogs are defaultOpen.
     */
    const root = useFloatingPortalNode({ root: rootElement });

    /* TODO: Add keepmounted-prop */
    const shouldRender = mounted; /* || keepMounted */

    if (!shouldRender) {
      return null;
    }

    return (
      <Portal
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        rootElement={root}
        asChild={false}
      >
        {children}
      </Portal>
    );
  },
);

export { DialogPortal };
export type { DialogPortalProps };
