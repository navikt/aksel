import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";

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
 */
const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropProps>(
  ({ className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return <div {...restProps} ref={forwardedRef} className={cn(className)} />;
  },
);

export { OverlayBackdrop };
export type { OverlayBackdropProps };
