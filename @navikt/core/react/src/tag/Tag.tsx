import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail } from "..";

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

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size = "medium", ...rest }, ref) => {
    const Component = size === "medium" ? BodyShort : Detail;

    return (
      <Component
        {...rest}
        ref={ref}
        as="span"
        size={size}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`
        )}
      />
    );
  }
);

export default Tag;
