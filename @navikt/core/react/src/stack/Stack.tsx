import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
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
}

export const Stack: OverridableComponent<StackProps, HTMLDivElement> =
  forwardRef(
    (
      {
        className,
        as: Component = "div",
        vertical = false,
        wrap = true,
        spacing = "4",
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
            {
              "navds-stack--vertical": vertical,
              "navds-stack--no-wrap": !wrap,
            }
          )}
        />
      );
    }
  );

export default Stack;
