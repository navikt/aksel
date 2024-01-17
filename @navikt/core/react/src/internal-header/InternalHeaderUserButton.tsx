import cl from "clsx";
import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail } from "../typography";
import { OverridableComponent } from "../util/types";
import InternalHeaderButton from "./InternalHeaderButton";

export interface InternalHeaderUserButtonProps
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

export const InternalHeaderUserButton: OverridableComponent<
  InternalHeaderUserButtonProps,
  HTMLButtonElement
> = forwardRef(({ as, name, description, className, ...rest }, ref) => (
  <InternalHeaderButton
    {...rest}
    as={as}
    ref={ref}
    className={cl("navds-internalheader__user-button", className)}
  >
    <div>
      <BodyShort size="small" as="div">
        {name}
      </BodyShort>
      {description && <Detail as="div">{description}</Detail>}
    </div>
    <ChevronDownIcon title="vis meny" />
  </InternalHeaderButton>
));

export default InternalHeaderUserButton;
