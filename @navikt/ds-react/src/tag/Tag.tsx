import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { Detail } from "../";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag
   */
  children: React.ReactNode;
  /**
   * Changes background-color and border-color
   *
   */
  variant: "warning" | "error" | "info" | "success";
  /**
   * Changes sizing of tag
   * @default "medium"
   */
  size?: "medium" | "small";
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size = "medium", ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`,
          {
            "navds-body-short": size === "medium",
            "navds-detail": size === "small",
            "navds-detail--small": size === "small",
          }
        )}
        {...rest}
      />
    );
  }
);

export default Tag;
