import React, { forwardRef } from "react";
import cl from "classnames";
import { Placement } from "@popperjs/core";
import { Popover, PopoverProps } from "@navikt/ds-react";
import List, { ListType } from "./List";
import GroupedList, { GroupedListType } from "./GroupedList";

export interface DropdownMenuProps extends PopoverProps {
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
  /**
   * Distance from anchor to popover
   * @default 8 w/arrow, -4 w/no-arrow
   */
  offset?: number;
}

export interface DropdownMenuType<Props = DropdownMenuProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  List: ListType;
  GroupedList: GroupedListType;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      className,
      children,
      placement = "bottom-end",
      arrow = false,
      offset,
      ...rest
    },
    ref
  ) => (
    <Popover
      {...rest}
      ref={ref}
      placement={placement}
      arrow={arrow}
      className={cl("navdsi-dropdown-menu", className)}
      offset={offset ?? arrow ? 8 : -4}
    >
      {children}
    </Popover>
  )
) as DropdownMenuType;

DropdownMenu.List = List;
DropdownMenu.GroupedList = GroupedList;

export default DropdownMenu;
