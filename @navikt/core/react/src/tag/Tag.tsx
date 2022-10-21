import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "..";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag label
   */
  children: React.ReactNode;
  /**
   * Changes background and border color
   */
  variant:
    | "warning"
    | "error"
    | "info"
    | "success"
    | "neutral"
    | "alt1"
    | "alt2"
    | "alt3";
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size = "medium", ...rest }, ref) => {
    const Component = size === "medium" ? BodyShort : Detail;

    return (
      <Component
        {...rest}
        ref={ref}
        as="span"
        size={size === "medium" ? "medium" : "small"}
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
