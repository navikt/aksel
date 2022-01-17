import React, { forwardRef, HTMLAttributes, useState } from "react";
import cl from "classnames";
import { Collapse, Expand, ExpandFilled } from "@navikt/ds-icons";
import MenuItems from "./MenuItems";

export interface MenuDrawerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export type MenuDrawerType = React.ForwardRefExoticComponent<
  MenuDrawerProps & React.RefAttributes<HTMLDivElement>
>;

const Drawer: MenuDrawerType = forwardRef(
  ({ children, defaultOpen = false, title, className, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div
        ref={ref}
        className={cl("navds-menu-collapsable", className, {
          "navds-menu-collapsable--open": isOpen,
        })}
        {...rest}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navds-menu-collapsable__button"
        >
          {title}
          <Expand
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-collapsable__expand-icon"
          />
          <ExpandFilled
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-collapsable__expand-icon navds-menu-collapsable__expand-icon--filled"
          />
        </button>
        {isOpen && (
          <MenuItems className="navds-menu__list--inner">{children}</MenuItems>
        )}
      </div>
    );
  }
);

export default Drawer;
