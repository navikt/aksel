import React, { forwardRef, SVGProps } from "react";
import cl from "classnames";
import { useId } from "..";

export interface LoaderProps extends SVGProps<SVGSVGElement> {
  /**
   * Changes sizing
   * 64px | 40px | 32px | 24px | 20px | 16px
   * @default "medium"
   */
  size?: "2xlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall";
  /**
   * Title prop on svg
   * @default "venter..."
   */
  title?: React.ReactNode;
  /*
   * Background-circle in svg set to transparent
   */
  transparent?: boolean;
  /**
   * Colored variants for loader
   * @default "neutral"
   */
  variant?: "neutral" | "interaction" | "inverted";
}

const Loader = forwardRef<SVGSVGElement, LoaderProps>(
  (
    {
      children,
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
    const internalId = useId(id);

    return (
      <svg
        aria-labelledby={internalId}
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
        {...rest}
      >
        <title id={id ?? `loader-${internalId}`}>{title}</title>
        <circle
          className="navds-loader__background"
          xmlns="http://www.w3.org/2000/svg"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
        <circle
          className="navds-loader__foreground"
          cx="25"
          cy="25"
          r="20"
          stroke={"var(--navds-color-gray-40)"}
          fill="none"
          strokeWidth="5"
          strokeDasharray="50 155"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

export default Loader;
