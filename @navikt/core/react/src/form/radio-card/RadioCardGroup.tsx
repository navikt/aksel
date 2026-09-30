import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import RadioGroup, { type RadioGroupProps } from "../radio/RadioGroup";

type RadioCardGroupProps = RadioGroupProps;

/**
 * RadioGroup for `<RadioCard />` elements. Horizontal layout is best suited for a small number of radio cards.
 * @see 🏷️ {@link RadioCardGroupProps}
 * @example
 * ```tsx
 * <RadioCardGroup legend="Velg leveringsmåte">
 *   <RadioCard value="digital">Digital levering</RadioCard>
 *   <RadioCard value="post">Post</RadioCard>
 * </RadioCardGroup>
 * ```
 */
const RadioCardGroup = forwardRef<HTMLFieldSetElement, RadioCardGroupProps>(
  ({ className, ...rest }, ref) => (
    <RadioGroup
      {...rest}
      ref={ref}
      className={cl("aksel-radio-card-group", className)}
    />
  ),
);

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace RadioCardGroup {
  export type Props = RadioCardGroupProps;
}

// eslint-disable-next-line import/export
export { RadioCardGroup };
export type { RadioCardGroupProps };
