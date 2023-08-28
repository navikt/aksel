import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { BreakpointsAlias } from "../utilities/css";

export interface ResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @example
   * above='md'
   */
  above?: Exclude<BreakpointsAlias, "xs">;
  /**
   * @example
   * below='md'
   */
  below?: Exclude<BreakpointsAlias, "xs">;
}

const Responsive: OverridableComponent<
  ResponsiveProps & { variant: "show" | "hide" },
  HTMLDivElement
> = forwardRef(
  (
    { as: Component = "div", className, above, below, variant, ...rest },
    ref
  ) => {
    const aboveProp = variant === "show" ? above : below;
    const belowProp = variant === "show" ? below : above;

    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-responsive", className, {
          [`navds-responsive__above--${aboveProp}`]: aboveProp,
          [`navds-responsive__below--${belowProp}`]: belowProp,
        })}
      />
    );
  }
);

export const Hide: OverridableComponent<ResponsiveProps, HTMLDivElement> =
  forwardRef((props, ref) => (
    <Responsive {...props} ref={ref} variant="hide" />
  ));

export const Show: OverridableComponent<ResponsiveProps, HTMLDivElement> =
  forwardRef((props, ref) => (
    <Responsive {...props} ref={ref} variant="show" />
  ));
