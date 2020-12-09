import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/link-styles";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link anchor should direct to
   */
  href: string;
  /**
   * User defined classname
   */
  className?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, href, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cl("navds-link", className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

export default Link;
