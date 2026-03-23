import React, { forwardRef } from "react";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";

export interface InternalHeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
  /**
   * Active state for element.
   * @default false
   */
  isActive?: boolean;
}
export const InternalHeaderButton: OverridableComponent<
  InternalHeaderButtonProps,
  HTMLButtonElement
> = forwardRef(
  ({ as: Component = "button", className, isActive = false, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("aksel-internalheader__button", className)}
        data-active={isActive}
      />
    );
  },
);

export default InternalHeaderButton;
