import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/types";

export interface InternalHeaderButtonProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
}
export const InternalHeaderButton: OverridableComponent<
  InternalHeaderButtonProps,
  HTMLButtonElement
> = forwardRef(({ as: Component = "button", className, ...rest }, ref) => (
  <Component
    {...rest}
    ref={ref}
    className={cl("navds-internalheader__button", className)}
  />
));

export default InternalHeaderButton;
