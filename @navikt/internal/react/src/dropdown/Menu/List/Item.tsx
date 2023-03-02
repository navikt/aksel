import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { OverridableComponent } from "@navikt/ds-react";
import { DropdownContext } from "../../Dropdown";

export interface ListItemProps extends React.ButtonHTMLAttributes<HTMLElement> {
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
  ({ as: Component = "button", className, ...rest }, ref) => {
    const context = useContext(DropdownContext);

    return (
      <li className="navdsi-dropdown__list-item">
        <Component
          {...rest}
          value={rest.children}
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            context?.onSelect?.(event);
            rest?.onClick?.(event);
          }}
          ref={ref}
          className={cl(
            "navdsi-dropdown__item",
            "navds-body-short",
            "navds-body-short--small",
            className
          )}
        />
      </li>
    );
  }
);

export default ListItem;
