import React, { forwardRef, useContext } from "react";
import { Popover } from "../../popover";
import { useRenameCSS } from "../../theme/Theme";
import { DropdownContext } from "../context";
import Divider from "./Divider";
import GroupedList, { GroupedListType } from "./GroupedList";
import List, { ListType } from "./List";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
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

export interface MenuType<Props = DropdownMenuProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ListType}
   */
  List: ListType;
  /**
   * @see 🏷️ {@link GroupedListType}
   */
  GroupedList: GroupedListType;
  /**
   * @see 🏷️ {@link React.HTMLAttributes<HTMLHRElement>}
   */
  Divider: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLHRElement> & React.RefAttributes<HTMLHRElement>
  >;
}

export const Menu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, onClose, placement = "bottom-end", ...rest }, ref) => {
    const { cn } = useRenameCSS();
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
        className={cn("navds-dropdown__menu", className)}
        offset={-4}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => {
          handleToggle(false);
          onClose?.();
        }}
      />
    );
  },
) as MenuType;

Menu.List = List;
Menu.GroupedList = GroupedList;
Menu.Divider = Divider;

export default Menu;
