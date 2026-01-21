import React, { HTMLAttributes, forwardRef } from "react";
import { BodyShort, Detail } from "../typography";
import { cl } from "../utils/helpers";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * User name
   */
  name: React.ReactNode;
  /**
   * User description
   */
  description?: React.ReactNode;
}

export const InternalHeaderUser = forwardRef<
  HTMLDivElement,
  InternalHeaderUserProps
>(({ className, name, description, ...rest }, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
      className={cl("aksel-internalheader__user", className)}
    >
      <div>
        <BodyShort size="small" as="div">
          {name}
        </BodyShort>
        {description && <Detail as="div">{description}</Detail>}
      </div>
    </div>
  );
});

export default InternalHeaderUser;
