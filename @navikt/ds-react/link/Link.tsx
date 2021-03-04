import React, { forwardRef } from "react";
import cl from "classnames";
import "@navikt/ds-css/link/index.css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link anchor should direct to
   */
  href: string;
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
