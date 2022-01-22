import React, { forwardRef } from "react";
import cl from "classnames";
import MenuItems from "./MenuItems";

import Item, { MenuItemType } from "./MenuItem";
import Collapse, { MenuCollapseType } from "./MenuCollapse";

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface MenuComponent
  extends React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<HTMLElement>
  > {
  Collapse: MenuCollapseType;
  Item: MenuItemType;
}

const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ children, className, ...rest }, ref) => (
      <nav
        {...rest}
        role="navigation"
        ref={ref}
        className={cl("navds-menu", className)}
      >
        <MenuItems>{children}</MenuItems>
      </nav>
    )
) as MenuComponent;

Menu.Collapse = Collapse;
Menu.Item = Item;

export default Menu;
