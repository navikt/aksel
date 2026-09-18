import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import RadioGroup, { type RadioGroupProps } from "../radio/RadioGroup";

export interface RadioCardGroupProps extends RadioGroupProps {
  /**
   * Layout direction for the radio cards.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * RadioGroup for `<RadioCard />` elements. Should include max 2 radio cards if horizontal.
 * @see 🏷️ {@link RadioCardGroupProps}
 * @example
 * ```tsx
 * <RadioCardGroup orientation="horizontal">
 *   <RadioCard value="1" label="Option 1" />
 *   <RadioCard value="2" label="Option 2" />
 * </RadioCardGroup>
 * ```
 */
const RadioCardGroup = forwardRef<HTMLFieldSetElement, RadioCardGroupProps>(
  ({ className, orientation = "vertical", ...rest }, ref) => (
    <RadioGroup
      {...rest}
      ref={ref}
      className={cl(className, "aksel-radio-card-group")}
      data-orientation={orientation}
    />
  ),
);

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace RadioCardGroup {
  export type Props = RadioCardGroupProps;
}

// eslint-disable-next-line import/export
export { RadioCardGroup };
