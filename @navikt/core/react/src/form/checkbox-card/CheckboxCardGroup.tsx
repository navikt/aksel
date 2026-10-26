import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import CheckboxGroup, {
  type CheckboxGroupProps,
} from "../checkbox/CheckboxGroup";

type CheckboxCardGroupProps = CheckboxGroupProps;

/**
 * CheckboxGroup for `<CheckboxCard />` elements. Horizontal layout is best suited for a small number of checkbox cards.
 * @see 🏷️ {@link CheckboxCardGroupProps}
 * @example
 * ```tsx
 * <CheckboxCardGroup legend="Velg varslingskanaler">
 *   <CheckboxCard value="sms">SMS</CheckboxCard>
 *   <CheckboxCard value="epost">E-post</CheckboxCard>
 * </CheckboxCardGroup>
 * ```
 */
const CheckboxCardGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxCardGroupProps
>(({ className, ...rest }, ref) => (
  <CheckboxGroup
    {...rest}
    ref={ref}
    className={cl("aksel-checkbox-card-group", className)}
  />
));

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CheckboxCardGroup {
  export type Props = CheckboxCardGroupProps;
}

export { CheckboxCardGroup };
export type { CheckboxCardGroupProps };
