import cl from "clsx";
import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../../util/types";
import ListItem, { type ListItemProps } from "./Item";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

export interface ListType
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLUListElement>
  > {
  /**
   * @see 🏷️ {@link ListItemProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Item: OverridableComponent<ListItemProps, HTMLButtonElement>;
}

export const List = forwardRef(({ className, children, ...rest }, ref) => (
  <ul {...rest} ref={ref} className={cl("navds-dropdown__list", className)}>
    {children}
  </ul>
)) as ListType;

List.Item = ListItem;
List.displayName = "Dropdown.Menu.List";
export default List;
