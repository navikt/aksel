import React, { forwardRef, SVGProps } from "react";
import cl from "clsx";
import { omit, useId } from "..";

export interface LoaderProps extends SVGProps<SVGSVGElement> {
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
   * @default "venter..."
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
 * <Loader size="3xlarge" title="venter..." />
 * ```
 */
export const Loader: LoaderType = forwardRef<SVGSVGElement, LoaderProps>(
  (
    {
      className,
      size = "medium",
      title = "venter...",
      transparent = false,
      variant = "neutral",
      id,
      ...rest
    },
    ref
  ) => {
    const internalId = useId();

    return (
      <svg
        aria-labelledby={id ?? `loader-${internalId}`}
        ref={ref}
        className={cl(
          "navds-loader",
          className,
          `navds-loader--${size}`,
          `navds-loader--${variant}`,
          {
            "navds-loader--transparent": transparent,
          }
        )}
        focusable="false"
        viewBox="0 0 50 50"
        preserveAspectRatio="xMidYMid"
        {...omit(rest, ["children"])}
      >
        <title id={id ?? `loader-${internalId}`}>{title}</title>
        <circle
          className="navds-loader__background"
          xmlns="http://www.w3.org/2000/svg"
          cx="25"
          cy="25"
          r="20"
          fill="none"
        />
        <circle
          className="navds-loader__foreground"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeDasharray="50 155"
        />
      </svg>
    );
  }
);

export default Loader;
