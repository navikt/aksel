import React, { forwardRef } from "react";
import { OverridableComponent } from "..";
import cl from "classnames";

export interface MenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export type MenuLinkType = OverridableComponent<
  MenuLinkProps,
  HTMLAnchorElement
>;

const Link: MenuLinkType = forwardRef(
  (
    { children, as: Component = "a", active = false, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-menu-link", className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Link;
