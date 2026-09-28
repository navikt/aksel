import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";

interface CoachMarkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Element the coach mark is anchored to.
   * Leave empty to render the mark standalone.
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
 * @see 🏷️ {@link CoachMarkProps}
 * @example
 * ```jsx
 *    <Coach.Mark>
 *      <Button>Next step</Button>
 *    </Coach.Mark>
 * ```
 */
const CoachMark = forwardRef<HTMLButtonElement, CoachMarkProps>(
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

    const Mark = (
      <button
        {...restProps}
        ref={forwardedRef}
        data-color={color}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={ariaHidden}
        className={cl("aksel-coach__mark-container", className)}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div
          className="aksel-coach__mark-pulse-outer"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div
          className="aksel-coach__mark-pulse-inner"
          data-animation={animation}
          style={{ animationDuration: `${durationInMs}ms` }}
        />
        <div className="aksel-coach__mark" />
      </button>
    );

    if (!children) {
      return Mark;
    }

    return (
      <div className="aksel-coach__mark-anchor">
        {children}
        {Mark}
      </div>
    );
  },
);

export { CoachMark };
export type { CoachMarkProps };
