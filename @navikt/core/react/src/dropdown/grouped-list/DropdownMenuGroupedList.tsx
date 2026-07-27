import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { DropdownMenuGroupedListHeading } from "../grouped-list-heading/DropdownMenuGroupedListHeading";
import { DropdownMenuGroupedListItem } from "../grouped-list-item/DropdownMenuGroupedListItem";

interface DropdownMenuGroupedListProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

const DropdownMenuGroupedListRoot = forwardRef<
  HTMLDListElement,
  DropdownMenuGroupedListProps
>(({ className, children, ...rest }, ref) => {
  return (
    <dl {...rest} ref={ref} className={cl("aksel-dropdown__list", className)}>
      {children}
    </dl>
  );
});

const DropdownMenuGroupedList = Object.assign(DropdownMenuGroupedListRoot, {
  /**
   * @see 🏷️ {@link DropdownMenuGroupedListHeadingProps}
   */
  Heading: DropdownMenuGroupedListHeading,
  /**
   * @see 🏷️ {@link DropdownMenuGroupedListItemProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Item: DropdownMenuGroupedListItem,
});

export { DropdownMenuGroupedList };
export type { DropdownMenuGroupedListProps };
