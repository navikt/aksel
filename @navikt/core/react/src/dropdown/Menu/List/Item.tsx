import React, { forwardRef, useContext } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { OverridableComponent } from "../../../util/types";
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
      const { cn } = useRenameCSS();
      const context = useContext(DropdownContext);

      return (
        <li className={cn("navds-dropdown__list-item")}>
          <Component
            {...rest}
            value={rest.children}
            onClick={composeEventHandlers(onClick, context?.onSelect)}
            ref={ref}
            className={cn(
              "navds-dropdown__item",
              "navds-body-short",
              "navds-body-short--small",
              className,
            )}
          />
        </li>
      );
    },
  );

export default ListItem;
