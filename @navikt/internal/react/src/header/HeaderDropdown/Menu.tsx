import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { DropdownMenu, DropdownMenuType } from "../..";
import { HeaderDropdownContext } from ".";

interface HeaderDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dropdown content
   */
  children: React.ReactNode;
}

export type HeaderDropdownMenuType = DropdownMenuType<HeaderDropdownMenuProps>;

const HeaderDropdownMenu = forwardRef(({ className, ...rest }, ref) => {
  const context = useContext(HeaderDropdownContext);

  if (!context) {
    console.warn("HeaderDropdownMenu has to be wrapped in <HeaderDropdown />");
    return null;
  }

  const { isOpen, anchorEl, setIsOpen, dropdownId } = context;

  return (
    <DropdownMenu
      {...rest}
      ref={ref}
      anchorEl={anchorEl}
      id={dropdownId}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={cl("navdsi-header-dropdown-menu", className)}
    />
  );
}) as HeaderDropdownMenuType;

HeaderDropdownMenu.Item = DropdownMenu.Item;

export default HeaderDropdownMenu;
