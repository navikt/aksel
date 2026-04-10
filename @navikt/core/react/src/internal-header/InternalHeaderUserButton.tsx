import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail } from "../typography";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";
import InternalHeaderButton from "./InternalHeaderButton";

export interface InternalHeaderUserButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
> = forwardRef(({ as, name, description, className, ...rest }, ref) => {
  return (
    <InternalHeaderButton
      {...rest}
      as={as}
      ref={ref}
      className={cl("aksel-internalheader__user-button", className)}
    >
      <div>
        <BodyShort size="small" as="div">
          {name}
        </BodyShort>
        {description && <Detail as="div">{description}</Detail>}
      </div>
      <ChevronDownIcon aria-hidden />
    </InternalHeaderButton>
  );
});

export default InternalHeaderUserButton;
