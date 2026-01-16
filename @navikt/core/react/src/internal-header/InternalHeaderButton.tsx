import React, { forwardRef } from "react";
import { cl } from "../util/className";
import { OverridableComponent } from "../util/types";

export interface InternalHeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
}
export const InternalHeaderButton: OverridableComponent<
  InternalHeaderButtonProps,
  HTMLButtonElement
> = forwardRef(({ as: Component = "button", className, ...rest }, ref) => {
  return (
    <Component
      {...rest}
      ref={ref}
      className={cl("aksel-internalheader__button", className)}
    />
  );
});

export default InternalHeaderButton;
