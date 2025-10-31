import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useMergeRefs } from "../../util/hooks";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogBackdropProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

/**
 * @see 🏷️ {@link DialogBackdropProps}
 * @example
 * ```jsx
 * ```
 */
const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const {
      mounted,
      transitionStatus,
      nested,
      backdropRef,
      setBackdropElement,
    } = useDialogContext();

    const mergedRefs = useMergeRefs(
      forwardedRef,
      backdropRef,
      setBackdropElement,
    );

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}-style`]: true }
      : {};

    if (!mounted) {
      return null;
    }

    return (
      <div
        {...restProps}
        ref={mergedRefs}
        className={cn(className, "navds-dialog__backdrop")}
        role="presentation"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        /* TODO: Might be better way to "hide" nested backdops */
        hidden={nested}
        {...transitionAttrb}
      />
    );
  },
);

export { DialogBackdrop };
export type { DialogBackdropProps };
