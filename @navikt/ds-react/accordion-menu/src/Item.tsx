import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Item = forwardRef<Lenke, AccordionMenuItemProps>(
  ({ children, className, ...rest }, ref) => (
    <li className={"navds-accordion-menu__item"}>
      <Lenke
        ref={ref}
        className={cl("navds-accordion-menu__link", className)}
        {...rest}
      >
        <div className="navds-accordion-menu__chevron">
          <HoyreChevron />
        </div>
        {children}
      </Lenke>
    </li>
  )
);

export default Item;
