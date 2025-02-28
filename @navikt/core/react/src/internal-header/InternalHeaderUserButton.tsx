import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { BodyShort, Detail } from "../typography";
import { OverridableComponent } from "../util/types";
import InternalHeaderButton from "./InternalHeaderButton";

export interface InternalHeaderUserButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const { cn } = useRenameCSS();

  return (
    <InternalHeaderButton
      {...rest}
      as={as}
      ref={ref}
      className={cn("navds-internalheader__user-button", className)}
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
