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
  ({ as: Component = "button", children, className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl("navdsi-header-user-menu__item", className)}
    >
      {children}
    </Component>
  )
);

export default Item;
