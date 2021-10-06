import React, { forwardRef } from "react";
import cl from "classnames";

export interface HeaderDropdownMenuListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type HeaderDropdownMenuListType = React.ForwardRefExoticComponent<
  HeaderDropdownMenuListProps & React.RefAttributes<HTMLUListElement>
>;

const List: HeaderDropdownMenuListType = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <ul
      {...rest}
      ref={ref}
      role="menu"
      className={cl("navdsi-dropdown-menu__list", className)}
    >
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  )
);

export default List;
