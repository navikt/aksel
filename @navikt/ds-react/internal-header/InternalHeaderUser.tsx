import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  name: string;
  ident: string;
}

const InternalHeaderUser = forwardRef<HTMLDivElement, InternalHeaderUserProps>(
  ({ className, name, ident, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-header__user", className)} {...rest}>
      <span className="navds-header__name">{name}</span>
      <span className="navds-header__ident">{ident}</span>
    </div>
  )
);

export default InternalHeaderUser;
