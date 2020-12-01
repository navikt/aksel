import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/tag-styles";

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
  /**
   * Internal padding
   * @default "medium"
   */
  size?: "medium" | "small";
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ children, className, variant, size = "medium" }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`
        )}
      >
        <span>{children}</span>
      </div>
    );
  }
);

export default Tag;
