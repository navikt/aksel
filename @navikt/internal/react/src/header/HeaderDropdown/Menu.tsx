import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { DropdownMenu, DropdownMenuType } from "../..";
import { HeaderDropdownContext } from ".";
export { DropdownMenuType as HeaderDropdownMenuType } from "../..";

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
}) as DropdownMenuType;

HeaderDropdownMenu.List = DropdownMenu.List;
HeaderDropdownMenu.Item = DropdownMenu.Item;

export default HeaderDropdownMenu;
