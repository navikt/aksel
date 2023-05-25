import { ChevronDownIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort, Detail } from "../typography";
import { OverridableComponent } from "../util/OverridableComponent";
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

export type InternalHeaderUserButtonType = OverridableComponent<
  InternalHeaderUserButtonProps,
  HTMLButtonElement
>;

export const InternalHeaderUserButton: InternalHeaderUserButtonType =
  forwardRef(({ as, name, description, className, ...rest }, ref) => (
    <InternalHeaderButton
      {...rest}
      as={as}
      ref={ref}
      className={cl("navdsi-header__user-button", className)}
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
