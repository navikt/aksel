import React, { forwardRef, HTMLAttributes, useState } from "react";
import cl from "classnames";
import { HoyreChevron, NedChevron } from "nav-frontend-chevron";
import Menu from "./index";

export interface AccordionMenuDropdownProps
  extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  active?: boolean;
}

const Dropdown = forwardRef<HTMLButtonElement, AccordionMenuDropdownProps>(
  ({ children, active, title, className, ...rest }, ref) => {
    const [open, setOpen] = useState(active || false);
    return (
      <li
        className={cl(
          "navds-accordion-menu__item",
          "navds-accordion-menu__dropdown"
        )}
      >
        <button
          ref={ref}
          onClick={() => setOpen(!open)}
          className={cl("lenke", "navds-accordion-menu__button", className)}
          {...rest}
        >
          <div className="navds-accordion-menu__chevron">
            {open ? <NedChevron /> : <HoyreChevron />}
          </div>
          {title}
        </button>
        <div className={"navds-accordion-menu__dropdown--content"}>
          {open && <Menu>{children}</Menu>}
        </div>
      </li>
    );
  }
);

export default Dropdown;
