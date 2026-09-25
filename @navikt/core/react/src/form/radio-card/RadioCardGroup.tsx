import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import RadioGroup, { type RadioGroupProps } from "../radio/RadioGroup";

export type RadioCardGroupProps = RadioGroupProps;

/**
 * RadioGroup for `<RadioCard />` elements. Horizontal layout is best suited for a small number of radio cards.
 * @see 🏷️ {@link RadioCardGroupProps}
 * @example
 * ```tsx
 * <RadioCardGroup >
 *   <RadioCard value="1" label="Option 1" />
 *   <RadioCard value="2" label="Option 2" />
 * </RadioCardGroup>
 * ```
 */
const RadioCardGroup = forwardRef<HTMLFieldSetElement, RadioCardGroupProps>(
  ({ className, ...rest }, ref) => (
    <RadioGroup
      {...rest}
      ref={ref}
      className={cl(className, "aksel-radio-card-group")}
    />
  ),
);

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace RadioCardGroup {
  export type Props = RadioCardGroupProps;
}

// eslint-disable-next-line import/export
export { RadioCardGroup };
