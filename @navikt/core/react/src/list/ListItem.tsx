import cl from "clsx";
import React, { forwardRef } from "react";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export interface ListItemType
  extends React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  > {}

export const ListItem: ListItemType = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <li {...rest} ref={ref} className={cl("navds-list__item", className)}>
      {children}
    </li>
  )
);

export default ListItem;
