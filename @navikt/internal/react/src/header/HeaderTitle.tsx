import React, { forwardRef } from "react";
import cl from "classnames";
import { Heading, OverridableComponent } from "@navikt/ds-react";

export interface HeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export type HeaderTitleType = OverridableComponent<
  HeaderTitleProps,
  HTMLHeadingElement
>;

const HeaderTitle: HeaderTitleType = forwardRef(
  ({ as = "h1", children, className, ...rest }, ref) => (
    <Heading
      {...rest}
      ref={ref}
      as={as}
      size="xsmall"
      className={cl("navdsi-header__title", className)}
    >
      <span>{children}</span>
    </Heading>
  )
);

export default HeaderTitle;
