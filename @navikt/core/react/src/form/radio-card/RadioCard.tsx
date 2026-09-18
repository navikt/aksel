import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import Radio, { RadioCardContextProvider } from "../radio/Radio";
import type { RadioProps } from "../radio/types";

type RadioCardProps = RadioProps;

/**
 * Radio option styled as a card.
 * @see 🏷️ {@link RadioCardProps}
 */
const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
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

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace RadioCard {
  export type Props = RadioCardProps;
}

// eslint-disable-next-line import/export
export { RadioCard };
