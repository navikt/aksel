import React, { forwardRef } from "react";
import cl from "classnames";
import { Placement } from "@popperjs/core";
import { Popover, PopoverProps } from "@navikt/ds-react";
import List, { DropdownMenuListType } from "./List";
import Item, { DropdownMenuItemType } from "./Item";
import DescriptionList, {
  DropdownMenuDescriptionListType,
} from "./DescriptionList";
import DescriptionTerm, {
  DropdownMenuDescriptionTermType,
} from "./DescriptionTerm";
import DescriptionDetail, {
  DropdownMenuDescriptionDetailType,
} from "./DescriptionDetail";

export interface DropdownMenuProps extends PopoverProps {
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

export interface DropdownMenuType<Props = DropdownMenuProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  List: DropdownMenuListType;
  Item: DropdownMenuItemType;
  DescriptionList: DropdownMenuDescriptionListType;
  DescriptionTerm: DropdownMenuDescriptionTermType;
  DescriptionDetail: DropdownMenuDescriptionDetailType;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
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
  ) => (
    <Popover
      {...rest}
      ref={ref}
      placement={placement}
      arrow={arrow}
      className={cl("navdsi-dropdown-menu", className)}
      offset={offset ?? arrow ? 8 : -4}
    >
      {children}
    </Popover>
  )
) as DropdownMenuType;

DropdownMenu.List = List;
DropdownMenu.Item = Item;
DropdownMenu.DescriptionList = DescriptionList;
DropdownMenu.DescriptionDetail = DescriptionDetail;
DropdownMenu.DescriptionTerm = DescriptionTerm;

export default DropdownMenu;
