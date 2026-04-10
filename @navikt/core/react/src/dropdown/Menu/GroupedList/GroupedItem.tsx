import React, { forwardRef, useContext } from "react";
import type { OverridableComponent } from "../../../utils-external";
import { cl, composeEventHandlers } from "../../../utils/helpers";
import { DropdownContext } from "../../context";

export interface GroupedItemProps extends React.ButtonHTMLAttributes<HTMLElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export const GroupedItem: OverridableComponent<
  GroupedItemProps,
  HTMLButtonElement
> = forwardRef(
  ({ as: Component = "button", className, onClick, ...rest }, ref) => {
    const context = useContext(DropdownContext);

    return (
      <dd className="aksel-dropdown__list-item">
        <Component
          {...rest}
          value={rest.children}
          onClick={composeEventHandlers(onClick, context?.onSelect)}
          ref={ref}
          className={cl(
            "aksel-dropdown__item",
            "aksel-body-short",
            "aksel-body-short--small",
            className,
          )}
        />
      </dd>
    );
  },
);

export default GroupedItem;
