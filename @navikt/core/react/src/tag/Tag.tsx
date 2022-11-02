import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "..";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /**
   * Changes visual profile of tag
   */
  variant:
    | "warning"
    | "warning-filled"
    | "error"
    | "error-filled"
    | "info"
    | "info-filled"
    | "success"
    | "success-filled"
    | "neutral"
    | "neutral-filled"
    | "alt1"
    | "alt1-filled"
    | "alt2"
    | "alt2-filled"
    | "alt3"
    | "alt3-filled";
  /**
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
