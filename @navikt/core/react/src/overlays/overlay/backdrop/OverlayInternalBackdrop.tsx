import React, { forwardRef } from "react";

type OverlayInternalBackdropProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

/**
 * @internal
 */
const OverlayInternalBackdrop = forwardRef<
  HTMLDivElement,
  OverlayInternalBackdropProps
>((props, forwardedRef) => {
  return (
    <div
      {...props}
      ref={forwardedRef}
      role="presentation"
      data-aksel-inert
      style={{
        position: "fixed",
        inset: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    />
  );
});

export { OverlayInternalBackdrop };
export type { OverlayInternalBackdropProps };
