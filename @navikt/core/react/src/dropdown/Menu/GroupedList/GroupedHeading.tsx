import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";

export interface GroupedHeadingProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Heading
   */
  children: React.ReactNode;
}

export const GroupedHeading = forwardRef<
  HTMLDetailsElement,
  GroupedHeadingProps
>(({ className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  return (
    <dt
      {...rest}
      ref={ref}
      className={cn(
        "navds-dropdown__list-heading",
        "navds-heading",
        "navds-heading--xsmall",
        className,
      )}
    />
  );
});

export default GroupedHeading;
