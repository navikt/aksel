import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";

interface CoachDotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Element the coach dot is anchored to.
   * Leave empty to render the dot standalone.
   */
  children?: React.ReactElement;
  /**
   * Badge color.
   * @default "danger"
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;

  // TODO:C Remove - test
  animation: string;
  // TODO:C Test
  durationInMs: number;
}

/**
 * @see 🏷️ {@link CoachDotProps}
 * @example
 * ```jsx
 *    <Coach.Dot>
 *      <Button>Next step</Button>
 *    </Coach.Dot>
 * ```
 */
const CoachDot = forwardRef<HTMLButtonElement, CoachDotProps>(
  (
    {
      children,
      onClick,
      className,
      animation,
      durationInMs,
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-hidden": ariaHidden,
      ...restProps
    },
    forwardedRef,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    };

    const Dot = (
      <button
        {...restProps}
        ref={forwardedRef}
        data-color={color}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={ariaHidden}
        className={cl("aksel-coach__dot-container", className)}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div
          className="aksel-coach__dot-pulse-outer"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div
          className="aksel-coach__dot-pulse-inner"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div className="aksel-coach__dot" />
      </button>
    );

    if (!children) {
      return Dot;
    }

    return (
      <div className="aksel-coach__dot-anchor">
        {children}
        {Dot}
      </div>
    );
  },
);

export { CoachDot };
export type { CoachDotProps };
