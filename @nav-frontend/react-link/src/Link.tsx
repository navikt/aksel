import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/link-styles";

export interface LinkProps {
  /**
   * User defined classname
   */
  className?: string;
}

const Link = forwardRef<HTMLDivElement, LinkProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cl("navds-link", className)}>
        <h2>Hello from react-link</h2>
        {children}
      </div>
    );
  }
);

export default Link;
