import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface HeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export type HeaderTitleType = OverridableComponent<
  HeaderTitleProps,
  HTMLAnchorElement
>;

const HeaderTitle: HeaderTitleType = forwardRef(
  ({ as: Component = "h1", children, className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl("navdsi-header__title", className)}
    >
      <span>{children}</span>
    </Component>
  )
);

export default HeaderTitle;
