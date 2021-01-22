import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  classname?: string;
  name: string;
  ident: string;
}

const InternalHeaderUser = forwardRef<HTMLDivElement, InternalHeaderUserProps>(
  ({ classname, name, ident, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-header__user", classname)} {...rest}>
      <span className="navds-header__name">{name}</span>
      <span className="navds-header__ident">{ident}</span>
    </div>
  )
);

export default InternalHeaderUser;
