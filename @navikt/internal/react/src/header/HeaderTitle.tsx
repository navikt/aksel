import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "@navikt/ds-react";

export interface HeaderTitleProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export type HeaderTitleType = OverridableComponent<
  HeaderTitleProps,
  HTMLAnchorElement
>;

export const HeaderTitle: HeaderTitleType = forwardRef(
  ({ as: Component = "a", children, className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      size="xsmall"
      className={cl("navdsi-header__title", "navds-body-short", className)}
    >
      <span>{children}</span>
    </Component>
  )
);

export default HeaderTitle;
