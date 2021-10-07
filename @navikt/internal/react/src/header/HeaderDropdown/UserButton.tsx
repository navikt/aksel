import React, { forwardRef } from "react";
import cl from "classnames";
import HeaderDropdownButton from "./Button";
import { BodyShort, Detail } from "@navikt/ds-react";
import { Expand } from "@navikt/ds-icons";

export interface HeaderDropdownUserButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  description?: string;
}

export type HeaderDropdownUserButtonType = React.ForwardRefExoticComponent<
  HeaderDropdownUserButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const HeaderDropdownUserButton: HeaderDropdownUserButtonType = forwardRef(
  ({ className, ...rest }, ref) => (
    <HeaderDropdownButton
      {...rest}
      ref={ref}
      className={cl("navdsi-header-dropdown__user-button", className)}
    >
      <div>
        <BodyShort size="small">Kong Harald</BodyShort>
        <Detail size="small">Enhet: Skien</Detail>
      </div>
      <Expand />
    </HeaderDropdownButton>
  )
);

export default HeaderDropdownUserButton;
