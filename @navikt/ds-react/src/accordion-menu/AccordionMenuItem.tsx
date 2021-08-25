import React, { forwardRef } from "react";
import OverridableComponent from "../util/newOverridableComponent";
import cl from "classnames";

interface AccordionMenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
}

const AccordionMenuItem: OverridableComponent<
  AccordionMenuItemProps,
  HTMLAnchorElement
> = forwardRef(
  (
    { children, as: Component = "a", active = false, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-accordion-menu-item", className, {
          "navds-accordion-menu-item--active": active,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default AccordionMenuItem;
