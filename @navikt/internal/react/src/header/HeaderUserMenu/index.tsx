import React, { forwardRef, useState, useCallback } from "react";
import { DropdownMenuItem, DropdownMenuItemType } from "./Item";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";
import { Divider, DropdownMenu } from "../..";

export interface HeaderUserMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Menu content
   */
  children: React.ReactNode;
  /**
   * user name
   */
  name: string;
  /**
   * user ident
   */
  ident: string;
}

export interface HeaderUserMenuType
  extends React.ForwardRefExoticComponent<
    HeaderUserMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: DropdownMenuItemType;
}

const HeaderUserMenu = forwardRef<HTMLButtonElement, HeaderUserMenuProps>(
  ({ className, name, ident, children, ...rest }, ref) => {
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
          {name}
          <Expand />
        </button>
        <DropdownMenu
          anchorEl={anchorEl}
          onClose={onClose}
          open={isOpen}
          className="navdsi-header-user-menu__dropdown"
        >
          <div>{name}</div>
          <div>{ident}</div>
          <Divider />
          {children}
        </DropdownMenu>
      </>
    );
  }
) as HeaderUserMenuType;

HeaderUserMenu.Item = DropdownMenuItem;

export default HeaderUserMenu;
