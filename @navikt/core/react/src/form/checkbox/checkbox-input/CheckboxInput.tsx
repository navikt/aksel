import React, { forwardRef, useCallback } from "react";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";

type CheckboxInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
  children?: never;
  standalone?: boolean;
  /**
   * Reduces pseudo-element target-size.
   */
  compact?: boolean;
};

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (
    {
      className,
      indeterminate,
      standalone = true,
      compact,
      ...rest
    }: CheckboxInputProps,
    forwardedRef,
  ) => {
    const indeterminateRef = useCallback(
      (el: HTMLInputElement | null) => {
        if (el) {
          el.indeterminate = indeterminate ?? false;
        }
      },
      [indeterminate],
    );

    const mergedRef = useMergeRefs(indeterminateRef, forwardedRef);

    return (
      <div
        className="aksel-checkbox__input-wrapper"
        data-standalone={standalone}
        data-compact={compact}
      >
        <input
          {...rest}
          className={cl("aksel-checkbox__input", className)}
          type="checkbox"
          ref={mergedRef}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 10"
          fill="none"
          focusable={false}
          aria-hidden
          role="presentation"
          className="aksel-checkbox__icon"
        >
          <path
            d="M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  },
);

export { CheckboxInput };
export type { CheckboxInputProps };
