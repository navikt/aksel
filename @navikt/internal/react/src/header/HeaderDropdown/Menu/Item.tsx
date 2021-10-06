import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface HeaderDropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type HeaderDropdownMenuItemType = OverridableComponent<
  HeaderDropdownMenuItemProps,
  HTMLButtonElement
>;

const Item: HeaderDropdownMenuItemType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      role="menuitem"
      className={cl(
        "navdsi-dropdown-menu__item navds-body-short navds-body-short__small",
        className
      )}
    />
  )
);

export default Item;
