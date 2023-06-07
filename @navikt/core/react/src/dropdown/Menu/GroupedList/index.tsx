import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../../util/OverridableComponent";
import GroupedHeading, { GroupedHeadingProps } from "./Heading";
import GroupedItem, { GroupedItemProps } from "./Item";

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
  /**
   * @see 🏷️ {@link GroupedHeadingProps}
   */
  Heading: React.ForwardRefExoticComponent<
    GroupedHeadingProps & React.RefAttributes<HTMLDetailsElement>
  >;
  /**
   * @see 🏷️ {@link GroupedItemProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Item: OverridableComponent<GroupedItemProps, HTMLButtonElement>;
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
