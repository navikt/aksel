import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/tag/index.css";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /**
   * Changes background-color and border-color
   */
  variant: "warning" | "error" | "info" | "success";
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
