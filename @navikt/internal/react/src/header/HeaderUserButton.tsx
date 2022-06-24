import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "@navikt/ds-react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { Expand } from "@navikt/ds-icons";
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
        </BodyShort>
        {description && (
          <Detail size="small" as="div">
            {description}
          </Detail>
        )}
      </div>
      <Expand />
    </HeaderButton>
  )
);

export default HeaderUserButton;
