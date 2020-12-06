import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/link-styles";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * User defined classname
   */
  className?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <a ref={ref} className={cl("navds-link", className)} {...rest}>
        {children}
      </a>
    );
  }
);

export default Link;
