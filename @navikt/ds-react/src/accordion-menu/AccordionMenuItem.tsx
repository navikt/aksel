import React, { forwardRef } from "react";
import cl from "classnames";

export interface AccordionMenuItemProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
  override?: boolean;
}

const AccordionMenuItem = forwardRef<HTMLAnchorElement, AccordionMenuItemProps>(
  ({ children, active = false, className, override, ...rest }, ref) => {
    const props = {
      ...rest,
      ref,
      className: cl("navds-accordion-menu-item", className, {
        "navds-accordion-menu-item--active": active,
      }),
    };

    if (override) {
      let child = React.Children.only(children);
      if (React.isValidElement(child)) {
        return React.cloneElement(child, props);
      } else {
        console.error(
          "AccordionMenuItem with override=true received invalid react element as child."
        );
        return null;
      }
    } else {
      return <a {...props}>{children}</a>;
    }
  }
);

export default AccordionMenuItem;
