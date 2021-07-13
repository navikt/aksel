import React, { forwardRef, SVGProps, useRef } from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";

export interface LoaderProps extends SVGProps<SVGSVGElement> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Changes sizing
   * 64px | 40px | 32px | 24px | 20px | 16px
   * @default "m"
   */
  size?: "2xl" | "xl" | "l" | "m" | "s" | "xs";
  /**
   * Title prop on svg
   * @default "venter..."
   */
  title?: React.ReactNode;
  /*
   * Background-circle in svg set to transparent
   */
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
      id,
      ...rest
    },
    ref
  ) => {
    const internalId = useRef(uuidv4());

    return (
      <svg
        aria-labelledby={id ?? internalId.current}
        ref={ref}
        className={cl("navds-loader", className, `navds-loader--${size}`, {
          "navds-loader--transparent": transparent,
        })}
        focusable="false"
        viewBox="0 0 50 50"
        preserveAspectRatio="xMidYMid"
        {...rest}
      >
        <title id={id ?? internalId.current}>{title}</title>
        <circle
          xmlns="http://www.w3.org/2000/svg"
          cx="25"
          cy="25"
          r="20"
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
