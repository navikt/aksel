import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "../typography";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * User name
   */
  name: string;
  /**
   * User description
   */
  description?: string;
}

export const InternalHeaderUser = forwardRef<
  HTMLDivElement,
  InternalHeaderUserProps
>(({ className, name, description, ...rest }, ref) => (
  <div
    {...rest}
    ref={ref}
    className={cl("navds-internalheader__user", className)}
  >
    <span>
      <BodyShort size="small" as="div">
        {name}
      </BodyShort>
      {description && <Detail as="div">{description}</Detail>}
    </span>
  </div>
));

export default InternalHeaderUser;
