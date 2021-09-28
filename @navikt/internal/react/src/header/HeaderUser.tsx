import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

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

const HeaderUser = forwardRef<HTMLDivElement, HeaderUserProps>(
  ({ className, name, ident, ...rest }, ref) => (
    <div ref={ref} className={cl("navdsi-header__user", className)} {...rest}>
      <span className="navdsi-header__name navds-body-short navds-body--small">
        {name}
      </span>
      <span className="navds-detail navds-detail--small">{ident}</span>
    </div>
  )
);

export default HeaderUser;
