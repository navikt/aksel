import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { BodyShort } from "../typography";

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
    | "alt3-moderate"
    | "meta-1"
    | "meta-1-filled"
    | "meta-1-moderate"
    | "meta-2"
    | "meta-2-filled"
    | "meta-2-moderate";
  /**
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
  /**
   * Tag Icon
   */
  icon?: React.ReactNode;
}

/**
 * A component that displays a small label with a text and a background color.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/tag)
 * @see 🏷️ {@link TagProps}
 *
 * @example
 * ```jsx
 * <Tag variant="success">Success</Tag>
 * ```
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, variant, size = "medium", icon, ...rest }, ref) => {
    const filledVariant = variant?.endsWith("-filled") && "strong";
    const moderateVariant = variant?.endsWith("-moderate") && "moderate";
    const color = variant?.replace("-filled", "").replace("-moderate", "");

    return (
      <BodyShort
        {...rest}
        ref={ref}
        as="span"
        size={size === "medium" ? "medium" : "small"}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`,
          `navds-tag--${filledVariant || moderateVariant || "outline"}`,
          `navds-tag--${color}`,
        )}
      >
        {icon && <span className="navds-tag__icon--left">{icon}</span>}
        {children}
      </BodyShort>
    );
  },
);

export default Tag;
