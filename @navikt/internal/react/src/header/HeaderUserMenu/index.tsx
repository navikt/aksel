import React, { forwardRef, HTMLAttributes, useState } from "react";
import Item, { ItemType } from "./Item";
import cl from "classnames";
import { Popover } from "@navikt/ds-react";
import { Expand } from "@navikt/ds-icons";

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
  Item: ItemType;
}

const HeaderUserMenu = forwardRef<HTMLButtonElement, HeaderUserMenuProps>(
  ({ className, name, ident, children, ...rest }, ref) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getInitials = (name) => {
      const split = name.split(" ");
      return `${split[0][0]}${split[split.length - 1][0]}`;
    };

    return (
      <>
        <button
          {...rest}
          ref={ref}
          className={cl("navdsi-header-user-menu", className)}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {getInitials(name)}
          <Expand ref={(el) => setAnchorEl(el)} />
        </button>
        <Popover
          anchorEl={anchorEl}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          arrow={false}
          placement="bottom-end"
          className="navdsi-header-user-menu__dropdown"
        >
          <Popover.Content>
            <div>{name}</div>
            <div>{ident}</div>
            <hr />
            {children}
          </Popover.Content>
        </Popover>
      </>
    );
  }
) as HeaderUserMenuType;

HeaderUserMenu.Item = Item;

export default HeaderUserMenu;
