import React, { forwardRef } from "react";
import cl from "classnames";
import Item, { ItemType } from "./Item";

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
  Item: ItemType;
}

const List = forwardRef(({ className, children, ...rest }, ref) => (
  <ul {...rest} ref={ref} className={cl("navdsi-dropdown__list", className)}>
    {children}
  </ul>
)) as ListType;

List.Item = Item;

export default List;
