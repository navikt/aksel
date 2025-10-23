import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useMergeRefs } from "../../util/hooks";
import { useOverlayContext } from "../root/DialogRoot.context";

type OverlayBackdropProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

/**
 * @see 🏷️ {@link OverlayBackdropProps}
 * @example
 * ```jsx
 * ```
 */
const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropProps>(
  ({ className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { mounted, transitionStatus, nested, backdropRef } =
      useOverlayContext();

    const mergedRefs = useMergeRefs(forwardedRef, backdropRef);

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}-style`]: true }
      : {};

    const shouldRender = mounted && !nested;

    if (!shouldRender) {
      return null;
    }

    return (
      <div
        {...restProps}
        ref={mergedRefs}
        className={cn(className)}
        role="presentation"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        {...transitionAttrb}
      />
    );
  },
);

export { OverlayBackdrop };
export type { OverlayBackdropProps };
