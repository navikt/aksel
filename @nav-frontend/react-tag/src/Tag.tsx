import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/tag-styles";

export interface TagProps {
  variant: "focus" | "warning" | "info" | "success";
  children: React.ReactNode;
  /**
   * User defined classname
   */
  className?: string;
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
