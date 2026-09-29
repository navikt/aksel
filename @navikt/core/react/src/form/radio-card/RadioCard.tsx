import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { Radio, RadioCardContextProvider } from "../radio/Radio";
import type { RadioProps } from "../radio/types";

type RadioCardProps = RadioProps;

/**
 * Radio option styled as a card.
 * @see 🏷️ {@link RadioCardProps}
 * @example
 * ```tsx
 * <RadioCardGroup legend="Velg leveringsmåte">
 *   <RadioCard value="digital" description="Sendes til innboksen din.">
 *     Digital levering
 *   </RadioCard>
 *   <RadioCard value="post">Post</RadioCard>
 * </RadioCardGroup>
 * ```
 */
const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadioCardContextProvider>
        <Radio
          {...rest}
          ref={ref}
          className={cl("aksel-radio-card", className)}
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
export type { RadioCardProps };
