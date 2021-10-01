import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail } from "@navikt/ds-react";

export interface HeaderUserProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * user name
   */
  name: string;
  /**
   * user ident
   */
  ident: string;
}

export type HeaderUserType = React.ForwardRefExoticComponent<
  HeaderUserProps & React.RefAttributes<HTMLDivElement>
>;

const HeaderUser = forwardRef<HTMLDivElement, HeaderUserProps>(
  ({ className, name, ident, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl("navdsi-header__user", className)}>
      <BodyShort size="small" className="navdsi-header__name">
        {name}
      </BodyShort>
      <Detail size="small">{ident}</Detail>
    </div>
  )
);

export default HeaderUser;
