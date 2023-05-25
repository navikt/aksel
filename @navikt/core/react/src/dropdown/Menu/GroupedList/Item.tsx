import { OverridableComponent } from "../../../util/OverridableComponent";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { DropdownContext } from "../../Dropdown";

export interface GroupedItemProps
  extends React.ButtonHTMLAttributes<HTMLElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type GroupedItemType = OverridableComponent<
  GroupedItemProps,
  HTMLButtonElement
>;

export const GroupedItem: GroupedItemType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => {
    const context = useContext(DropdownContext);

    return (
      <dd className="navdsi-dropdown__list-item">
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
      </dd>
    );
  }
);

export default GroupedItem;
