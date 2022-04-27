import React, { forwardRef } from "react";
import cl from "classnames";

export interface HeadingProps extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Heading
   */
  children: React.ReactNode;
}

export type HeadingType = React.ForwardRefExoticComponent<
  HeadingProps & React.RefAttributes<HTMLElement>
>;

export const Heading: HeadingType = forwardRef(
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

export default Heading;
