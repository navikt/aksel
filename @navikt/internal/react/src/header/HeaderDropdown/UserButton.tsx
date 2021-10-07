import React, { forwardRef } from "react";
import cl from "classnames";
import HeaderDropdownButton from "./Button";
import { BodyShort, Detail } from "@navikt/ds-react";
import { Expand } from "@navikt/ds-icons";

export interface HeaderDropdownUserButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * User name
   */
  name: string;
  /**
   * User description
   */
  description?: string;
}

export type HeaderDropdownUserButtonType = React.ForwardRefExoticComponent<
  HeaderDropdownUserButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const HeaderDropdownUserButton: HeaderDropdownUserButtonType = forwardRef(
  ({ name, description, className, ...rest }, ref) => (
    <HeaderDropdownButton
      {...rest}
      ref={ref}
      className={cl("navdsi-header__dropdown-user-button", className)}
    >
      <div>
        <BodyShort size="small" as="div">
          {name}
        </BodyShort>
        {description && (
          <Detail size="small" as="div">
            {description}
          </Detail>
        )}
      </div>
      <Expand />
    </HeaderDropdownButton>
  )
);

export default HeaderDropdownUserButton;
