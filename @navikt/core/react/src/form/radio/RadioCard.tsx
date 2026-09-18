import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import Radio, { RadioCardContextProvider } from "./Radio";
import type { RadioProps } from "./types";

type RadioCardProps = RadioProps;

/**
 * Radio option styled as a card.
 * @see 🏷️ {@link RadioCardProps}
 */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadioCardContextProvider>
        <Radio
          {...rest}
          ref={ref}
          className={cl(className, "aksel-radio-card")}
        />
      </RadioCardContextProvider>
    );
  },
);

export default RadioCard;
export type { RadioCardProps };
