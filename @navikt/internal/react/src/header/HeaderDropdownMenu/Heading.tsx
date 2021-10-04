import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent, Heading } from "@navikt/ds-react";

export interface HeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type HeadingType = OverridableComponent<
  HeadingProps,
  HTMLHeadingElement
>;

const DropdownHeading: HeadingType = forwardRef(
  ({ as = "h2", children, className, ...rest }, ref) => (
    <Heading
      {...rest}
      level="2"
      size="xsmall"
      as={as}
      ref={ref}
      className={cl("navdsi-header-user-menu__item", className)}
    >
      {children}
    </Heading>
  )
);

export default DropdownHeading;
