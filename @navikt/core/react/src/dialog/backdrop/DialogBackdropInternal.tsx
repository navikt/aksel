import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { createTransitionStatusAttribute } from "../../util/hooks/useTransitionStatus";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogBackdropInternalProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

/**
 * @see 🏷️ {@link DialogBackdropInternalProps}
 * @example
 * ```jsx
 * ```
 */
const DialogBackdropInternal = forwardRef<
  HTMLDivElement,
  DialogBackdropInternalProps
>(({ className, ...restProps }, forwardedRef) => {
  const { cn } = useRenameCSS();
  const { transitionStatus, nested } = useDialogContext();

  return (
    <div
      {...restProps}
      ref={forwardedRef}
      className={cn(className, "navds-dialog__backdrop")}
      role="presentation"
      hidden={nested}
      {...createTransitionStatusAttribute(transitionStatus)}
    />
  );
});

export { DialogBackdropInternal };
export type { DialogBackdropInternalProps };
