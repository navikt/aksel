import React, { forwardRef } from "react";
import cl from "classnames";
import { Heading } from "@navikt/ds-react";

export interface DropdownMenuHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Menu Heading content
   */
  children: React.ReactNode;
}

export type DropdownMenuHeadingType = React.ForwardRefExoticComponent<
  DropdownMenuHeadingProps & React.RefAttributes<HTMLHeadingElement>
>;

const DropdownMenuHeading: DropdownMenuHeadingType = forwardRef(
  ({ className, ...rest }, ref) => (
    <Heading
      {...rest}
      ref={ref}
      size="xsmall"
      as="div"
      className={cl("navdsi-dropdown-menu__heading", className)}
    />
  )
);

DropdownMenuHeading.displayName = "Yes";

export default DropdownMenuHeading;
