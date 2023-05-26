import React, { forwardRef } from "react";
import cl from "clsx";
import GroupedHeading, { GroupedHeadingType } from "./Heading";
import GroupedItem, { GroupedItemType } from "./Item";

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
  Heading: GroupedHeadingType;
  Item: GroupedItemType;
}

export const DescriptionList = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <dl {...rest} ref={ref} className={cl("navds-dropdown__list", className)}>
      {children}
    </dl>
  )
) as GroupedListType;

DescriptionList.Heading = GroupedHeading;
DescriptionList.Item = GroupedItem;

export default DescriptionList;
