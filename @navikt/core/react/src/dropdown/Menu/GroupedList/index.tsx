import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { OverridableComponent } from "../../../util/types";
import GroupedHeading, { GroupedHeadingProps } from "./GroupedHeading";
import GroupedItem, { GroupedItemProps } from "./GroupedItem";

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
  ({ className, children, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <dl {...rest} ref={ref} className={cn("navds-dropdown__list", className)}>
        {children}
      </dl>
    );
  },
) as GroupedListType;

DescriptionList.Heading = GroupedHeading;
DescriptionList.Item = GroupedItem;

export default DescriptionList;
