import React, { forwardRef } from "react";
import cl from "classnames";

export interface DropdownMenuDescriptionTermProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * Menu DescriptionTerm content
   */
  children: React.ReactNode;
}

export type DropdownMenuDescriptionTermType = React.ForwardRefExoticComponent<
  DropdownMenuDescriptionTermProps & React.RefAttributes<HTMLElement>
>;

const DropdownMenuDescriptionTerm: DropdownMenuDescriptionTermType = forwardRef(
  ({ className, ...rest }, ref) => (
    <dt
      {...rest}
      ref={ref}
      className={cl("navdsi-dropdown-menu__list-heading", className)}
    />
  )
);

export default DropdownMenuDescriptionTerm;
