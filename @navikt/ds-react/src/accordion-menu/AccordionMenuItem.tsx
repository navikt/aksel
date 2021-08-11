import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import cl from "classnames";

export interface AccordionMenuItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
}

const AccordionMenuItem = forwardRef<HTMLAnchorElement, AccordionMenuItemProps>(
  ({ children, active = false, className, ...rest }, ref) => {
    let child =
      typeof children === "string" ? (
        <a>{children}</a>
      ) : (
        React.Children.only(children)
      );

    const props = {
      ...rest,
      ref,
      className: cl("navds-accordion-menu-item", className, {
        "navds-accordion-menu-item--active": active,
      }),
    };

    return React.isValidElement(child)
      ? React.cloneElement(child, props)
      : null;
  }
);

export default AccordionMenuItem;
