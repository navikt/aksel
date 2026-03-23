import React, { forwardRef } from "react";

type RadioInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: never;
  standalone?: boolean;
  /**
   * Reduces psuedo-element target-size.
   */
  compact?: boolean;
};

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ standalone = true, compact, ...rest }: RadioInputProps, forwardedRef) => {
    return (
      <input
        ref={forwardedRef}
        className="aksel-radio__input"
        data-standalone={standalone}
        data-compact={compact}
        type="radio"
        {...rest}
      />
    );
  },
);

export { RadioInput };
export type { RadioInputProps };
