import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { BreakpointsAlias } from "../utilities/css";

export interface HideProps extends HTMLAttributes<HTMLDivElement> {
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

export const Hide: OverridableComponent<HideProps, HTMLDivElement> = forwardRef(
  ({ as: Component = "div", className, above, below, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-hide", className, {
          "navds-hide__above": !!above,
          [`navds-hide__above--${above}`]: above,
          "navds-hide__below": !!below,
          [`navds-hide__below--${below}`]: below,
        })}
      />
    );
  }
);
