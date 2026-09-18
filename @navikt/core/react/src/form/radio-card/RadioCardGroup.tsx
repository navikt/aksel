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
 * Form radio group for `<RadioCard />` elements.
 * @see 🏷️ {@link RadioCardGroupProps}
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
