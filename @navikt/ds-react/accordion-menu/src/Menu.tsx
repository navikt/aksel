import React from "react";
import { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from "react";
import cl from "classnames";
import { default as Item, AccordionMenuItemProps } from "./Item";
import { Element } from "nav-frontend-typografi";
import { default as Collapsable } from "./Collapsable";
import { AccordionMenuCollapsableProps } from "./Collapsable";
import { StoreProvider } from "./Context";
import Nav from "./Nav";
import "@navikt/ds-css/accordion-menu/index.css";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<AccordionMenuProps> {
  Collapsable: ForwardRefExoticComponent<AccordionMenuCollapsableProps>;
  Item: ForwardRefExoticComponent<AccordionMenuItemProps>;
}

export interface AccordionMenuProps extends HTMLAttributes<HTMLUListElement> {
  title?: string;
}

const AccordionMenu = forwardRef<HTMLUListElement, AccordionMenuProps>(
  ({ children, title, className, ...rest }, ref) => {
    return (
      <StoreProvider>
        <Nav title={title}>
          <Element>{title}</Element>
          <ul
            ref={ref}
            className={cl("navds-accorcion-menu__container", className)}
            {...rest}
          >
            {children}
          </ul>
        </Nav>
      </StoreProvider>
    );
  }
) as LayoutWithSubComponents;

AccordionMenu.Item = Item;
AccordionMenu.Collapsable = Collapsable;
export default AccordionMenu;
