import React, { forwardRef } from "react";
import cl from "classnames";

export interface LinkProps {
  props: {
    children: string;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
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
