import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface ListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type ListItemType = OverridableComponent<
  ListItemProps,
  HTMLButtonElement
>;

export const ListItem: ListItemType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <li className="navdsi-dropdown__list-item">
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navdsi-dropdown__item",
          "navds-body-short",
          "navds-body-short--small",
          className
        )}
      />
    </li>
  )
);

export default ListItem;
