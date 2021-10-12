import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface ItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type ItemType = OverridableComponent<ItemProps, HTMLButtonElement>;

const Item: ItemType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <li className="navdsi-dropdown-menu__list-item">
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
