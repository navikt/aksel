import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "@navikt/ds-react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import HeaderButton from "./HeaderButton";

export interface HeaderUserButtonProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  /**
   * User name
   */
  name: string;
  /**
   * User description
   */
  description?: string;
}

export type HeaderUserButtonType = OverridableComponent<
  HeaderUserButtonProps,
  HTMLButtonElement
>;

export const HeaderUserButton: HeaderUserButtonType = forwardRef(
  ({ as, name, description, className, ...rest }, ref) => (
    <HeaderButton
      {...rest}
      as={as}
      ref={ref}
      className={cl("navdsi-header__user-button", className)}
    >
      <div>
        <BodyShort size="small" as="div">
          {name}
          ass
        </BodyShort>
        {description && <Detail as="div">{description}</Detail>}
      </div>
      <ChevronDownIcon title="vis meny" />
    </HeaderButton>
  )
);

export default HeaderUserButton;
