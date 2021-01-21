import React, { forwardRef } from "react";
import cl from "classnames";
import "@navikt/ds-css/tag/index.css";

export interface TagProps {
  children: React.ReactNode;
  /**
   * Changes background-color and border-color
   */
  variant: "warning" | "error" | "info" | "success";
  /**
   * User defined classname
   */
  className?: string;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, variant }, ref) => {
    return (
      <span
        ref={ref}
        className={cl("navds-tag", className, `navds-tag--${variant}`)}
      >
        {children}
      </span>
    );
  }
);

export default Tag;
