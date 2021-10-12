import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Placement } from "@popperjs/core";
import { Popover, PopoverProps } from "@navikt/ds-react";
import List, { ListType } from "./List";
import GroupedList, { GroupedListType } from "./GroupedList";
import { DropdownContext } from "../Dropdown";

export interface MenuProps extends PopoverProps {
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

export interface MenuType<Props = MenuProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  List: ListType;
  GroupedList: GroupedListType;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
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
  ) => {
    const context = useContext(DropdownContext);

    if (!context) {
      console.warn("HeaderMenu has to be wrapped in <HeaderDropdown />");
      return null;
    }
    const { isOpen, anchorEl, setIsOpen, dropdownId } = context;

    return (
      <Popover
        {...rest}
        ref={ref}
        placement={placement}
        arrow={arrow}
        className={cl("navdsi-dropdown-menu", className)}
        offset={offset ?? arrow ? 8 : -4}
        anchorEl={anchorEl}
        id={dropdownId}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Popover>
    );
  }
) as MenuType;

Menu.List = List;
Menu.GroupedList = GroupedList;

export default Menu;
