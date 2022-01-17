import React, { forwardRef } from "react";
import cl from "classnames";
import MenuItems from "./MenuItems";
import Drawer, { MenuDrawerType } from "./MenuDrawer";
import Item, { MenuItemType } from "./MenuItem";
import Link, { MenuLinkType } from "./MenuLink";

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface MenuComponent
  extends React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<HTMLElement>
  > {
  Drawer: MenuDrawerType;
  Item: MenuItemType;
  Link: MenuLinkType;
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
Menu.Link = Link;

export default Menu;
