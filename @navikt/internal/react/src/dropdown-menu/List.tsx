import React, { forwardRef } from "react";
import cl from "classnames";

export interface DropdownMenuListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

export type DropdownMenuListType = React.ForwardRefExoticComponent<
  DropdownMenuListProps & React.RefAttributes<HTMLUListElement>
>;

const List: DropdownMenuListType = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <ul
      {...rest}
      ref={ref}
      className={cl("navdsi-dropdown-menu__list", className)}
    >
      {children}
    </ul>
  )
);

export default List;
