import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface InternalHeaderButtonProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
}

export type InternalHeaderButtonType = OverridableComponent<
  InternalHeaderButtonProps,
  HTMLButtonElement
>;

export const InternalHeaderButton: InternalHeaderButtonType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl("navds-internalheader__button", className)}
    />
  )
);

export default InternalHeaderButton;
