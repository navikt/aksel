import React, { forwardRef, HTMLAttributes, useState } from "react";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";
import MenuItems from "./MenuItems";

export interface AccordionMenuCollapsableProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Collapsable = forwardRef<HTMLDivElement, AccordionMenuCollapsableProps>(
  ({ children, defaultOpen = false, title, className, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <div
        ref={ref}
        className={cl("navds-accordion-menu-collapsable", className, {
          "navds-accordion-menu-collapsable--open": isOpen,
        })}
        {...rest}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navds-accordion-menu-collapsable__button"
        >
          {title}
          <Expand
            role="img"
            aria-label={isOpen ? "Pil peker opp" : "Pil peker ned"}
            className="navds-accordion-menu-collapsable__expand-icon"
          />
        </button>
        {isOpen && <MenuItems>{children}</MenuItems>}
      </div>
    );
  }
);

export default Collapsable;
