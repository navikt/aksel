import { Popover } from "../../popover";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { DropdownContext } from "../Dropdown";
import Divider, { DividerType } from "./Divider";
import GroupedList, { GroupedListType } from "./GroupedList";
import List, { ListType } from "./List";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dropdown content
   */
  children: React.ReactNode;
  /**
   * onClose callback
   */
  onClose?: () => void;
  /**
   * Popover positionion strategy
   * @default "absolute"
   */
  strategy?: "fixed" | "absolute";
  /*
   * Default dialog-placement on open
   * @default "bottom-end"
   */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
}

export interface MenuType<Props = MenuProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  List: ListType;
  GroupedList: GroupedListType;
  Divider: DividerType;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ className, onClose, placement = "bottom-end", ...rest }, ref) => {
    const context = useContext(DropdownContext);

    if (!context) {
      console.warn("Dropdown.Menu has to be wrapped in <Dropdown />");
      return null;
    }

    const { isOpen, anchorEl, handleToggle } = context;

    return (
      <Popover
        {...rest}
        placement={placement}
        ref={ref}
        arrow={false}
        className={cl("navds-dropdown__menu", className)}
        offset={-4}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => {
          handleToggle(false);
          onClose && onClose();
        }}
      />
    );
  }
) as MenuType;

Menu.List = List;
Menu.GroupedList = GroupedList;
Menu.Divider = Divider;

export default Menu;
