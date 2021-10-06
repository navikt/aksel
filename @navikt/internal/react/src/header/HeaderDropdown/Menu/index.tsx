import React, { forwardRef, useContext } from "react";
import HeaderDropdownMenuList, { HeaderDropdownMenuListType } from "./List";
import HeaderDropdownMenuItem, { HeaderDropdownMenuItemType } from "./Item";
import cl from "classnames";
import { DropdownMenu } from "../../..";
import { HeaderDropdownContext } from "..";

interface HeaderDropdownMenuProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Menu content
   */
  children: React.ReactNode;
}

export interface HeaderDropdownMenuType
  extends React.ForwardRefExoticComponent<
    HeaderDropdownMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  List: HeaderDropdownMenuListType;
  Item: HeaderDropdownMenuItemType;
}

const HeaderDropdownMenu = forwardRef<HTMLElement, HeaderDropdownMenuProps>(
  ({ className, ...rest }, ref) => {
    const context = useContext(HeaderDropdownContext);

    if (!context) {
      console.warn(
        "HeaderDropdownMenu has to be wrapped in <HeaderDropdown />"
      );
      return null;
    }

    const { isOpen, anchorEl, setIsOpen, dropdownId } = context;

    return (
      <DropdownMenu
        {...rest}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        className={cl("navdsi-header-dropdown-menu", className)}
        id={dropdownId}
      />
    );
  }
) as HeaderDropdownMenuType;

HeaderDropdownMenu.List = HeaderDropdownMenuList;
HeaderDropdownMenu.Item = HeaderDropdownMenuItem;

export default HeaderDropdownMenu;
