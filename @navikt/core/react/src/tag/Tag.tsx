import React, { HTMLAttributes, forwardRef } from "react";
import { GlobalColorRoles } from "@navikt/ds-tokens/types";
import { useRenameCSS } from "../theme/Theme";
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
    | "alt3-moderate";

  /* Temp hide these until naming is resolved */
  // | "meta-purple"
  // | "meta-purple-filled"
  // | "meta-purple-moderate"
  // | "meta-lime"
  // | "meta-lime-filled"
  // | "meta-lime-moderate";
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
  (
    {
      children,
      className,
      variant,
      size = "medium",
      icon,
      "data-color": color,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const filledVariant = variant?.endsWith("-filled") && "strong";
    const moderateVariant = variant?.endsWith("-moderate") && "moderate";

    return (
      <BodyShort
        data-color={color ?? variantToColor(variant)}
        data-variant={filledVariant || moderateVariant || "outline"}
        {...rest}
        ref={ref}
        as="span"
        size={size === "medium" ? "medium" : "small"}
        className={cn(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${size}`,
        )}
      >
        {icon && <span className={cn("navds-tag__icon--left")}>{icon}</span>}
        {children}
      </BodyShort>
    );
  },
);

function variantToColor(variant: TagProps["variant"]): GlobalColorRoles {
  switch (variant) {
    case "warning":
    case "warning-filled":
    case "warning-moderate":
      return "warning";
    case "error":
    case "error-filled":
    case "error-moderate":
      return "danger";
    case "info":
    case "info-filled":
    case "info-moderate":
    case "alt3":
    case "alt3-filled":
    case "alt3-moderate":
      return "info";
    case "success":
    case "success-filled":
    case "success-moderate":
      return "success";
    case "neutral":
    case "neutral-filled":
    case "neutral-moderate":
      return "neutral";
    case "alt1":
    case "alt1-filled":
    case "alt1-moderate":
      return "meta-purple";
    case "alt2":
    case "alt2-filled":
    case "alt2-moderate":
      return "meta-lime";
    default:
      return "neutral";
  }
}

export default Tag;
