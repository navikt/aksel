import React from "react";
import { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from "react";
import cl from "classnames";
import { default as Item, AccordionMenuItemProps } from "./Item";
import { default as Dropdown, AccordionMenuDropdownProps } from "./Dropdown";
import "@navikt/ds-css/accordion-menu/index.css";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<LayoutProps> {
  Item: ForwardRefExoticComponent<AccordionMenuItemProps>;
  Dropdown: ForwardRefExoticComponent<AccordionMenuDropdownProps>;
}

export interface LayoutProps extends HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
  className?: string;
}

const Menu = forwardRef<HTMLUListElement, LayoutProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <ul
        ref={ref}
        className={cl("navds-accorcion-menu__container", className)}
        {...rest}
      >
        {children}
      </ul>
    );
  }
) as LayoutWithSubComponents;

Menu.Item = Item;
Menu.Dropdown = Dropdown;
export default Menu;
