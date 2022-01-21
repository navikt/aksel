import React, { forwardRef } from "react";
import cl from "classnames";
import MenuItems from "./MenuItems";
import Drawer, { MenuDrawerType } from "./MenuDrawer";
import Item, { MenuItemType } from "./MenuItem";

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface MenuComponent
  extends React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<HTMLElement>
  > {
  Drawer: MenuDrawerType;
  Item: MenuItemType;
}

const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <nav
        role="navigation"
        ref={ref}
        className={cl("navds-menu", className)}
        {...rest}
      >
        <MenuItems>{children}</MenuItems>
      </nav>
    );
  }
) as MenuComponent;

Menu.Drawer = Drawer;
Menu.Item = Item;

export default Menu;
