import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useOverlayContext } from "../root/OverlayRoot.context";

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
/**
 * TODO: Semi-transparent backdrop that covers the screen behind the overlay
 * - Closes overlay on click?
 * - Opt in? Can this be a prop on "Portal", where you can set backdrop=true/false? If false, you can use this to override backdrop then.
 * - Hide nested backdrops
 */
const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropProps>(
  ({ className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { open } = useOverlayContext();

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cn(className)}
        role="presentation"
        /* TODO: Use mounted */
        hidden={!open}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      />
    );
  },
);

export { OverlayBackdrop };
export type { OverlayBackdropProps };
