import React, { forwardRef, SVGProps } from "react";
import cl from "classnames";

export interface LoaderProps extends SVGProps<SVGSVGElement> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Changes sizing
   */
  size?: "2xl" | "xl" | "l" | "m" | "s" | "xs";
  title?: React.ReactNode;
  transparent?: boolean;
}

const Loader = forwardRef<SVGSVGElement, LoaderProps>(
  (
    {
      children,
      className,
      size = "m",
      title = "venter...",
      transparent = false,
      ...rest
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        className={cl("navds-loader", className, `navds-loader--${size}`)}
        focusable="false"
        viewBox="0 0 50 50"
        preserveAspectRatio="xMidYMid"
        {...rest}
      >
        <title>{title}</title>
        <circle
          xmlns="http://www.w3.org/2000/svg"
          cx="25"
          cy="25"
          r="20"
          stroke={transparent ? "transparent" : "var(--navds-color-gray-10)"}
          fill="none"
          strokeWidth="5"
        />
        <circle
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
