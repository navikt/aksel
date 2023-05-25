import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "@navikt/ds-react";

export interface HeaderUserProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * User name
   */
  name: string;
  /**
   * User description
   */
  description?: string;
}

export type HeaderUserType = React.ForwardRefExoticComponent<
  HeaderUserProps & React.RefAttributes<HTMLDivElement>
>;

export const HeaderUser = forwardRef<HTMLDivElement, HeaderUserProps>(
  ({ className, name, description, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl("navdsi-header__user", className)}>
      <span>
        <BodyShort size="small" as="div">
          {name}
        </BodyShort>
        {description && (
          <Detail size="small" as="div">
            {description}
          </Detail>
        )}
      </span>
    </div>
  )
);

export default HeaderUser;
