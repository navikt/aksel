import React, { forwardRef } from "react";
import { OverridableComponent } from "..";
import cl from "classnames";

export interface AccordionMenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  /**
   * Sets active styling if true
   * @default false
   */
  active?: boolean;
}

export type AccordionMenuItemType = OverridableComponent<
  AccordionMenuItemProps,
  HTMLAnchorElement
>;

const Item: AccordionMenuItemType = forwardRef(
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

export default Item;
