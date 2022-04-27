import React, { forwardRef } from "react";
import cl from "classnames";
import Heading, { HeadingType } from "./Heading";
import Item, { ItemType } from "./Item";

export interface GroupedListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

export interface GroupedListType
  extends React.ForwardRefExoticComponent<
    GroupedListProps & React.RefAttributes<HTMLDListElement>
  > {
  Heading: HeadingType;
  Item: ItemType;
}

export const DescriptionList = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <dl {...rest} ref={ref} className={cl("navdsi-dropdown__list", className)}>
      {children}
    </dl>
  )
) as GroupedListType;

DescriptionList.Heading = Heading;
DescriptionList.Item = Item;

export default DescriptionList;
