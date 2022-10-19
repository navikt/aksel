import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
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
    | "1";
  /**
   * Vertical alignment
   * @default "start"
   */
  align?: "start" | "end" | "center";
  /**
   * Makes children use full width
   */
  fullWidth?: boolean;
}

const alignT = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "4", align = "start", fullWidth, ...rest }, ref) => {
    const style = {
      ...(rest?.style ? rest?.style : {}),
      "--navdsc-stack-align": align ? `${alignT[align]}` : "",
      "--navdsc-stack-spacing": `var(--navds-spacing-${spacing})`,
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        style={style}
        ref={ref}
        className={cl("navds-stack", className, {
          "navds-stack--fullwidth": fullWidth,
        })}
      />
    );
  }
);

export default Stack;
