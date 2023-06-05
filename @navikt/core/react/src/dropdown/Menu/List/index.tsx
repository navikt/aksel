import React, { forwardRef } from "react";
import cl from "clsx";
import ListItem, { ListItemType } from "./Item";

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
  Item: ListItemType;
}

export const List = forwardRef(({ className, children, ...rest }, ref) => (
  <ul {...rest} ref={ref} className={cl("navds-dropdown__list", className)}>
    {children}
  </ul>
)) as ListType;

List.Item = ListItem;

export default List;
