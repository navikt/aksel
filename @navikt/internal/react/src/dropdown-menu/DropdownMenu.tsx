import React, { forwardRef } from "react";
import cl from "classnames";
import { Placement } from "@popperjs/core";
import { Popover, PopoverProps } from "@navikt/ds-react";
import Item, { DropdownMenuItemType } from "./Item";

export interface HeaderDropdownMenuProps extends PopoverProps {
  /**
   * Menu content
   */
  children: React.ReactNode;
  /**
   * Orientation for menu
   * @default "bottom-end"
   */
  placement?: Placement;
  /**
   *  Toggles rendering of arrow
   *  @default false
   */
  arrow?: boolean;
}

export interface DropdownMenuType
  extends React.ForwardRefExoticComponent<
    HeaderDropdownMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: DropdownMenuItemType;
}

const DropdownMenu = forwardRef<HTMLButtonElement, HeaderDropdownMenuProps>(
  (
    { className, children, placement = "bottom-end", arrow = false, ...rest },
    ref
  ) => (
    <Popover
      {...rest}
      placement={placement}
      arrow={arrow}
      className={cl("navdsi-dropdown-menu", className)}
    >
      {children}
    </Popover>
  )
) as DropdownMenuType;

DropdownMenu.Item = Item;

export default DropdownMenu;
