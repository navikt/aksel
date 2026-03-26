import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type RadioInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: never;
  standalone?: boolean;
  /**
   * Reduces pseudo-element target-size.
   */
  compact?: boolean;
};

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  (
    { className, standalone = true, compact, ...rest }: RadioInputProps,
    forwardedRef,
  ) => {
    return (
      <input
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-radio__input", className)}
        data-standalone={standalone}
        data-compact={compact}
        type="radio"
      />
    );
  },
);

export { RadioInput };
export type { RadioInputProps };
