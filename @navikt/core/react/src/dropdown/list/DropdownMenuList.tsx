import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { DropdownMenuListItem } from "../list-item/DropdownMenuListItem";

interface DropdownMenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

const DropdownMenuListRoot = forwardRef<
  HTMLUListElement,
  DropdownMenuListProps
>(({ className, children, ...rest }, ref) => {
  return (
    <ul {...rest} ref={ref} className={cl("aksel-dropdown__list", className)}>
      {children}
    </ul>
  );
});

DropdownMenuListRoot.displayName = "Dropdown.Menu.List";

const DropdownMenuList = Object.assign(DropdownMenuListRoot, {
  /**
   * @see 🏷️ {@link DropdownMenuListItemProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Item: DropdownMenuListItem,
});

export { DropdownMenuList };
export type { DropdownMenuListProps };
