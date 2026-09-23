import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";

interface CoachmarkDotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Element the coachmark dot is anchored to.
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
 * @see 🏷️ {@link CoachmarkDotProps}
 * @example
 * ```jsx
 *    <Coachmark.Dot>
 *      <Button>Next step</Button>
 *    </Coachmark.Dot>
 * ```
 */
const CoachmarkDot = forwardRef<HTMLButtonElement, CoachmarkDotProps>(
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
        className={cl("aksel-coachmark__dot-container", className)}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div
          className="aksel-coachmark__dot-pulse-outer"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div
          className="aksel-coachmark__dot-pulse-inner"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div className="aksel-coachmark__dot" />
      </button>
    );

    if (!children) {
      return Dot;
    }

    return (
      <div className="aksel-coachmark__dot-anchor">
        {children}
        {Dot}
      </div>
    );
  },
);

export { CoachmarkDot };
export type { CoachmarkDotProps };
