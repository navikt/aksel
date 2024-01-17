import cl from "clsx";
import React, { forwardRef } from "react";

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
>(({ className, ...rest }, ref) => (
  <dt
    {...rest}
    ref={ref}
    className={cl(
      "navds-dropdown__list-heading",
      "navds-heading",
      "navds-heading--xsmall",
      className,
    )}
  />
));

export default GroupedHeading;
