import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort } from "..";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /**
   * Changes visual profile of tag
   */
  variant:
    | "warning"
    | "warning-filled"
    | "warning-moderate"
    | "error"
    | "error-filled"
    | "error-moderate"
    | "info"
    | "info-filled"
    | "info-moderate"
    | "success"
    | "success-filled"
    | "success-moderate"
    | "neutral"
    | "neutral-filled"
    | "neutral-moderate"
    | "alt1"
    | "alt1-filled"
    | "alt1-moderate"
    | "alt2"
    | "alt2-filled"
    | "alt2-moderate"
    | "alt3"
    | "alt3-filled"
    | "alt3-moderate";
  /**
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size = "medium", ...rest }, ref) => (
    <BodyShort
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
  )
);

export default Tag;
