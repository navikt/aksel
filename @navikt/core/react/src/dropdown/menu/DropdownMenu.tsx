import React, { forwardRef, useContext } from "react";
import { Popover } from "../../popover";
import { cl } from "../../utils/helpers";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { DropdownMenuDivider } from "../divider/DropdownMenuDivider";
import { DropdownMenuGroupedList } from "../grouped-list/DropdownMenuGroupedList";
import { DropdownMenuList } from "../list/DropdownMenuList";
import { DropdownContext } from "../root/DropdownRoot.context";

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

const DropdownMenuRoot = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, onClose, placement = "bottom-end", ...rest }, ref) => {
    const context = useContext(DropdownContext);

    if (!context) {
      consoleWarning("<Dropdown.Menu /> has to be wrapped in <Dropdown />");
      return null;
    }

    const { isOpen, anchorEl, handleToggle } = context;

    return (
      <Popover
        {...rest}
        placement={placement}
        ref={ref}
        className={cl("aksel-dropdown__menu", className)}
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
);

const DropdownMenu = Object.assign(DropdownMenuRoot, {
  /**
   * @see 🏷️ {@link DropdownMenuListProps}
   */
  List: DropdownMenuList,
  /**
   * @see 🏷️ {@link DropdownMenuGroupedListProps}
   */
  GroupedList: DropdownMenuGroupedList,
  /**
   * @see 🏷️ {@link React.HTMLAttributes<HTMLHRElement>}
   */
  Divider: DropdownMenuDivider,
});

export { DropdownMenu };
export type { DropdownMenuProps };
