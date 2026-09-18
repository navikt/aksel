import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import RadioGroup, { type RadioGroupProps } from "./RadioGroup";

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
export const RadioCardGroup = forwardRef<
  HTMLFieldSetElement,
  RadioCardGroupProps
>(({ className, orientation = "vertical", ...rest }, ref) => (
  <RadioGroup
    {...rest}
    ref={ref}
    className={cl(className, "aksel-radio-card-group")}
    data-orientation={orientation}
  />
));

export default RadioCardGroup;
