import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface DropdownMenuDescriptionDetailProps
  extends React.ButtonHTMLAttributes<HTMLElement> {
  /**
   * Menu item content
   */
  children: React.ReactNode;
}

export type DropdownMenuDescriptionDetailType = OverridableComponent<
  DropdownMenuDescriptionDetailProps,
  HTMLButtonElement
>;

const DescriptionDetail: DropdownMenuDescriptionDetailType = forwardRef(
  ({ as: Component = "button", className, ...rest }, ref) => (
    <dd className="navdsi-dropdown-menu__list-item">
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navdsi-dropdown-menu__item",
          "navds-body-short",
          "navds-body-short--small",
          className
        )}
      />
    </dd>
  )
);

export default DescriptionDetail;
