import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Spacing between elements
   * @default "4"
   */
  spacing?:
    | "32"
    | "24"
    | "20"
    | "18"
    | "16"
    | "14"
    | "12"
    | "11"
    | "10"
    | "9"
    | "8"
    | "7"
    | "6"
    | "5"
    | "4"
    | "3"
    | "2"
    | "1"
    | "05"
    | "0";
  /**
   * Vertical alignment
   */
  align?: "start" | "end" | "center" | "baseline";
  /**
   * Horizontal alignment
   * @default "start"
   */
  justify?: "start" | "end" | "center" | "between";
  /**
   * @default true
   * Wraps elements when needed
   */
  wrap?: boolean;
}

const justifyT = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
};

const alignT = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
};

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      className,
      spacing = "4",
      align,
      justify = "start",
      wrap = true,
      ...rest
    },
    ref
  ) => {
    const style = {
      ...(rest?.style ? rest?.style : {}),
      "--navdsc-inline-wrap": wrap ? "wrap" : "nowrap",
      "--navdsc-inline-align": align ? `${alignT[align]}` : "",
      "--navdsc-inline-justify": justifyT[justify],
      "--navdsc-inline-spacing": `var(--navds-spacing-${spacing})`,
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        style={style}
        ref={ref}
        className={cl("navds-inline", className)}
      />
    );
  }
);

export default Inline;
