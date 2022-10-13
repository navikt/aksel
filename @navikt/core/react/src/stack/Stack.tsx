import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../util";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tag label
   */
  children: React.ReactNode;
  /**
   *
   * @default false
   */
  vertical?: boolean;
  /**
   *
   * @default true
   */
  wrap?: boolean;
  /**
   *
   * @default "4"
   */
  spacing?: "0" | "1" | "2" | "3" | "4" | "5" | "8";
  /**
   * @default "fill"
   */
  align?: "start" | "end" | "center" | "fill" | "baseline";
  /**
   *
   */
  distribute?: "between" | "start" | "end" | "center" | "fill" | "fillEvenly";
}

export const Stack: OverridableComponent<StackProps, HTMLDivElement> =
  forwardRef(
    (
      {
        className,
        vertical = false,
        wrap = true,
        spacing = "4",
        align = "fill",
        distribute,
        as: Component = "div",
        ...rest
      },
      ref
    ) => {
      return (
        <Component
          {...rest}
          ref={ref}
          className={cl(
            "navds-stack",
            className,
            `navds-stack--spacing-${spacing}`,
            `navds-stack--align-${align}`,
            distribute && `navds-stack--distribute-${align}`,
            align && {
              "navds-stack--vertical": vertical,
              "navds-stack--no-wrap": !wrap,
            }
          )}
        />
      );
    }
  );

export default Stack;
