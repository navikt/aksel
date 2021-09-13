import React, { forwardRef } from "react";
import cl from "classnames";
import MenuItems from "./MenuItems";
import Collapsable, {
  AccordionMenuCollapsableType,
} from "./AccordionMenuCollapsable";
import Item, { AccordionMenuItemType } from "./AccordionMenuItem";

export interface AccordionMenuProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface AccordionMenuComponent
  extends React.ForwardRefExoticComponent<
    AccordionMenuProps & React.RefAttributes<HTMLElement>
  > {
  Collapsable: AccordionMenuCollapsableType;
  Item: AccordionMenuItemType;
}

const AccordionMenu = forwardRef<HTMLElement, AccordionMenuProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <nav
        role="navigation"
        ref={ref}
        className={cl("navds-accordion-menu", className)}
        {...rest}
      >
        <MenuItems>{children}</MenuItems>
      </nav>
    );
  }
) as AccordionMenuComponent;

AccordionMenu.Collapsable = Collapsable;
AccordionMenu.Item = Item;

export default AccordionMenu;
