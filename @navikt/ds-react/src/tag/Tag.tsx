import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Changes background-color and border-color
   */
  variant: "warning" | "error" | "info" | "success";
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, variant, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cl("navds-tag", className, `navds-tag--${variant}`)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

export default Tag;
