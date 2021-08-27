import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail } from "..";

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

export type InternalHeaderUserType = React.ForwardRefExoticComponent<
  InternalHeaderUserProps & React.RefAttributes<HTMLDivElement>
>;

const InternalHeaderUser: InternalHeaderUserType = forwardRef(
  ({ className, name, ident, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-interal-header__user", className)}
      {...rest}
    >
      <BodyShort as="span" className="navds-interal-header__name" size="small">
        {name}
      </BodyShort>
      <Detail as="span" className="navds-interal-header__ident" size="small">
        {ident}
      </Detail>
    </div>
  )
);

export default InternalHeaderUser;
