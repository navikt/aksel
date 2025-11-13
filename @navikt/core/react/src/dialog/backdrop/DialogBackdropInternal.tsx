import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useMergeRefs } from "../../util/hooks";
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
  const { transitionStatus, nested, backdropRef, setBackdropElement } =
    useDialogContext();

  const mergedRefs = useMergeRefs(
    forwardedRef,
    backdropRef,
    setBackdropElement,
  );

  return (
    <div
      {...restProps}
      ref={mergedRefs}
      className={cn(className, "navds-dialog__backdrop")}
      role="presentation"
      hidden={nested}
      {...createTransitionStatusAttribute(transitionStatus)}
    />
  );
});

export { DialogBackdropInternal };
export type { DialogBackdropInternalProps };
