import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * user name
   */
  name: string;
  /**
   * user ident
   */
  ident: string;
}

const InternalHeaderUser = forwardRef<HTMLDivElement, InternalHeaderUserProps>(
  ({ className, name, ident, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-interal-header__user", className)}
      {...rest}
    >
      <span className="navds-interal-header__name navds-body-short navds-body--s">
        {name}
      </span>
      <span className="navds-detail navds-detail--s">{ident}</span>
    </div>
  )
);

export default InternalHeaderUser;
