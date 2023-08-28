import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { BreakpointsAlias } from "../utilities/css";

export interface ShowProps extends HTMLAttributes<HTMLDivElement> {
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

export const Show: OverridableComponent<ShowProps, HTMLDivElement> = forwardRef(
  ({ as: Component = "div", className, above, below, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-show", className, {
          "navds-show__above": !!above,
          [`navds-show__above--${above}`]: above,
          "navds-show__below": !!below,
          [`navds-show__below--${below}`]: below,
        })}
      />
    );
  }
);
