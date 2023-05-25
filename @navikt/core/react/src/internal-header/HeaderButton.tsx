import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "@navikt/ds-react";

export interface HeaderButtonProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
}

export type HeaderButtonType = OverridableComponent<
  HeaderButtonProps,
  HTMLButtonElement
>;

export const HeaderButton: HeaderButtonType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl("navdsi-header__button", className)}
    />
  )
);

export default HeaderButton;
