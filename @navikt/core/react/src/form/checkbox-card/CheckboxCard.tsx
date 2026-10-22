import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { Checkbox, CheckboxCardContextProvider } from "../checkbox/Checkbox";
import type { CheckboxProps } from "../checkbox/types";

type CheckboxCardProps = CheckboxProps;

/**
 * Checkbox option styled as a card.
 * @see 🏷️ {@link CheckboxCardProps}
 * @example
 * ```tsx
 * <CheckboxCardGroup legend="Velg varslingskanaler">
 *   <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
 *     SMS
 *   </CheckboxCard>
 *   <CheckboxCard value="epost">E-post</CheckboxCard>
 * </CheckboxCardGroup>
 * ```
 */
const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <CheckboxCardContextProvider>
        <Checkbox
          {...rest}
          ref={ref}
          className={cl("aksel-checkbox-card", className)}
        />
      </CheckboxCardContextProvider>
    );
  },
);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CheckboxCard {
  export type Props = CheckboxCardProps;
}

export { CheckboxCard };
export type { CheckboxCardProps };
