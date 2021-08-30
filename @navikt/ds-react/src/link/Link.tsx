import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
  /**
   * Link anchor should direct to
   */
  href?: string;
}

const Link: OverridableComponent<LinkProps, HTMLAnchorElement> = forwardRef(
  ({ children, as: Component = "a", className, href, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        href={href}
        className={cl("navds-link", className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Link;
