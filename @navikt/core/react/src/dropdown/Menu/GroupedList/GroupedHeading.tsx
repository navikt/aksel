import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

export interface GroupedHeadingProps extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Heading
   */
  children: React.ReactNode;
}

export const GroupedHeading = forwardRef<
  HTMLDetailsElement,
  GroupedHeadingProps
>(({ className, ...rest }, ref) => {
  return (
    <dt
      {...rest}
      ref={ref}
      className={cl(
        "aksel-dropdown__list-heading",
        "aksel-heading",
        "aksel-heading--xsmall",
        className,
      )}
    />
  );
});

export default GroupedHeading;
