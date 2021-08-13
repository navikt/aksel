import React, { forwardRef } from "react";
import OverridableComponent from "../util/newOverridableComponent";
import cl from "classnames";

interface AccordionMenuItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
  requiredProp: string;
}

const AccordionMenuItem: OverridableComponent<
  HTMLAnchorElement,
  AccordionMenuItemProps
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
