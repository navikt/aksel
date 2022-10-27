import React, { forwardRef } from "react";
import cl from "clsx";

export interface GroupedHeadingProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Heading
   */
  children: React.ReactNode;
}

export type GroupedHeadingType = React.ForwardRefExoticComponent<
  GroupedHeadingProps & React.RefAttributes<HTMLElement>
>;

export const GroupedHeading: GroupedHeadingType = forwardRef(
  ({ className, ...rest }, ref) => (
    <dt
      {...rest}
      ref={ref}
      className={cl(
        "navdsi-dropdown__list-heading",
        "navds-heading",
        "navds-heading--xsmall",
        className
      )}
    />
  )
);

export default GroupedHeading;
