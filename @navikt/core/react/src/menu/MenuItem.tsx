import React, { forwardRef } from "react";
import { OverridableComponent } from "..";
import cl from "classnames";

export interface MenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  /**
   * Sets active styling if true
   * @default false
   */
  active?: boolean;
}

export type MenuItemType = OverridableComponent<
  MenuItemProps,
  HTMLAnchorElement
>;

export const Item: MenuItemType = forwardRef(
  (
    { children, as: Component = "a", active = false, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-menu-item", className, {
          "navds-menu-item--active": active,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Item;
