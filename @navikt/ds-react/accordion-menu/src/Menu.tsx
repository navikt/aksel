import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";
import cl from "classnames";
import { default as Item, AccordionMenuItemProps } from "./Item";
import { default as Collapsable } from "./Collapsable";
import { AccordionMenuCollapsableProps } from "./Collapsable";
import { StoreProvider } from "./Context";
import Nav from "./Nav";
import "@navikt/ds-css/accordion-menu/index.css";
import { Heading } from "../../index";

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
          <Heading
            level={2}
            size="medium"
            className={cl("navds-accorcion-menu__title", className)}
          >
            {title}
          </Heading>
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
