import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type DropdownMenuItemType = OverridableComponent<
  DropdownMenuItemProps,
  HTMLButtonElement
>;

const Item: DropdownMenuItemType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <li>
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navdsi-dropdown-menu__item",
          "navds-body-short",
          "navds-body-short--small",
          className
        )}
      />
    </li>
  )
);

export default Item;
