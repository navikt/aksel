import React, { forwardRef, HTMLAttributes, useState } from "react";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";
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
            title={isOpen ? "Pil peker opp" : "Pil peker ned"}
            className="navds-menu-collapsable__expand-icon"
          />
        </button>
        {isOpen && <MenuItems>{children}</MenuItems>}
      </div>
    );
  }
);

export default Drawer;
