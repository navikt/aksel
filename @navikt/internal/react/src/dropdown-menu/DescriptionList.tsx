import React, { forwardRef } from "react";
import cl from "classnames";

export interface DropdownMenuDescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Menu list content
   */
  children: React.ReactNode;
}

export type DropdownMenuDescriptionListType = React.ForwardRefExoticComponent<
  DropdownMenuDescriptionListProps & React.RefAttributes<HTMLDListElement>
>;

const DescriptionList: DropdownMenuDescriptionListType = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <dl
      {...rest}
      ref={ref}
      className={cl("navdsi-dropdown-menu__list", className)}
    >
      {children}
    </dl>
  )
);

export default DescriptionList;
