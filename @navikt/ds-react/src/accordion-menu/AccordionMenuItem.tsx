import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import cl from "classnames";

export type AccordionMenuItemType = OverridableComponent<AccordionMenuItemProps>;

export interface AccordionMenuItemProps {
  props: {
    children: React.ReactNode;
    active?: boolean;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

const AccordionMenuItem: AccordionMenuItemType = forwardRef(
  (
    {
      children,
      component: Component = "a",
      active = false,
      className,
      ...rest
    },
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
