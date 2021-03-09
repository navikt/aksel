import React, { forwardRef, HTMLAttributes, useState } from "react";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";

export interface AccordionMenuCollapsableProps
  extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  active?: boolean;
}

const Collapsable = forwardRef<
  HTMLButtonElement,
  AccordionMenuCollapsableProps
>(({ children, active, title, className, ...rest }, ref) => {
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
        className={cl("navds-link", "navds-accordion-menu__button", className)}
        {...rest}
      >
        {title}
        <Expand
          className={cl(
            "navds-accordion__chevron",
            `navds-accordion__chevron--${open ? "up" : "down"}`,
            `navds-accordion-menu__chevron`
          )}
        />
      </button>
      {open && (
        <ul
          className={cl(
            "navds-accorcion-menu__container",
            "navds-accordion-menu__dropdown--content"
          )}
        >
          {children}
        </ul>
      )}
    </li>
  );
});

export default Collapsable;
