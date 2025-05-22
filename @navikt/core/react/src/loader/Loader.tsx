import React, { SVGProps, forwardRef } from "react";
import { GlobalColorRoles } from "@navikt/ds-tokens/types";
import { useRenameCSS } from "../theme/Theme";
import { omit } from "../util";
import { useId } from "../util/hooks";
import { useI18n } from "../util/i18n/i18n.hooks";

export interface LoaderProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /**
   * Changes Loader width/height
   * 88px | 64px | 40px | 32px | 24px | 20px | 16px
   * @default "medium"
   */
  size?:
    | "3xlarge"
    | "2xlarge"
    | "xlarge"
    | "large"
    | "medium"
    | "small"
    | "xsmall";
  /**
   * Title prop on svg
   * @default "Venter…"
   */
  title?: React.ReactNode;
  /**
   * Sets svg-background to transparent
   * @default false
   */
  transparent?: boolean;
  /**
   * Colored variants for Loader
   * @default "neutral"
   */
  variant?: "neutral" | "interaction" | "inverted";
}

/* Workaround for @types/react v17/v18 feil */
export type LoaderType = React.ForwardRefExoticComponent<
  LoaderProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * A component that displays a loading spinner.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/loader)
 * @see 🏷️ {@link LoaderProps}
 *
 * @example
 * ```jsx
 * <Loader size="3xlarge" title="Venter…" />
 * ```
 */
export const Loader: LoaderType = forwardRef<SVGSVGElement, LoaderProps>(
  (
    {
      className,
      size = "medium",
      title,
      transparent = false,
      variant = "neutral",
      id,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const internalId = useId();
    const translate = useI18n("Loader");

    return (
      <svg
        aria-labelledby={id ?? `loader-${internalId}`}
        ref={ref}
        className={cn(
          "navds-loader",
          className,
          `navds-loader--${size}`,
          `navds-loader--${variant}`,
          {
            "navds-loader--transparent": transparent,
          },
        )}
        focusable="false"
        viewBox="0 0 50 50"
        preserveAspectRatio="xMidYMid"
        data-color-role={variantToRole(variant)}
        {...omit(rest, ["children"])}
        data-variant={variant}
      >
        <title id={id ?? `loader-${internalId}`}>
          {title || translate("title")}
        </title>
        <circle
          className={cn("navds-loader__background")}
          xmlns="http://www.w3.org/2000/svg"
          cx="25"
          cy="25"
          r="20"
          fill="none"
        />
        <circle
          className={cn("navds-loader__foreground")}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeDasharray="50 155"
        />
      </svg>
    );
  },
);

function variantToRole(
  variant: LoaderProps["variant"],
): GlobalColorRoles | undefined {
  switch (variant) {
    case "neutral":
      return "neutral";
    case "inverted":
      return "neutral";
    /* We assume "interaction" is the main app color in this instance */
    case "interaction":
      return undefined;
    default:
      return "neutral";
  }
}

export default Loader;
