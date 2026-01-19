import React, { forwardRef, useContext } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { OverridableComponent } from "../../../util/types";
import { cl } from "../../../utils/helpers";
import { DropdownContext } from "../../context";

export interface ListItemProps extends React.ButtonHTMLAttributes<HTMLElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export const ListItem: OverridableComponent<ListItemProps, HTMLButtonElement> =
  forwardRef(
    ({ as: Component = "button", className, onClick, ...rest }, ref) => {
      const context = useContext(DropdownContext);

      return (
        <li className="aksel-dropdown__list-item">
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
        </li>
      );
    },
  );

export default ListItem;
