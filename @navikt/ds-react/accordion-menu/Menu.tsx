import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import MenuItems from "./MenuItems";

export interface AccordionMenuProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
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
);

export default AccordionMenu;
