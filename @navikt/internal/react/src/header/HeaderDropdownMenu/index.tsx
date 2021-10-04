import React, { forwardRef, useState, useCallback } from "react";
import DropdownHeading, { HeadingType } from "./Heading";
import Item, { ItemType } from "./Item";
import cl from "classnames";
import { Popover } from "@navikt/ds-react";
import { System } from "@navikt/ds-icons";

export interface HeaderDropdownMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu content
   */
  children: React.ReactNode;
}

export interface HeaderDropdownMenuType
  extends React.ForwardRefExoticComponent<
    HeaderDropdownMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  Heading: HeadingType;
  Item: ItemType;
}

const HeaderDropdownMenu = forwardRef<
  HTMLButtonElement,
  HeaderDropdownMenuProps
>(({ className, children, ...rest }, ref) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        {...rest}
        ref={ref}
        className={cl("navdsi-header-user-menu", className)}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <System />
      </button>
      <Popover
        anchorEl={anchorEl}
        onClose={onClose}
        open={isOpen}
        arrow={false}
        placement="bottom-end"
        className="navdsi-header-user-menu__dropdown"
      >
        {children}
      </Popover>
    </>
  );
}) as HeaderDropdownMenuType;

HeaderDropdownMenu.Heading = DropdownHeading;
HeaderDropdownMenu.Item = Item;

export default HeaderDropdownMenu;
