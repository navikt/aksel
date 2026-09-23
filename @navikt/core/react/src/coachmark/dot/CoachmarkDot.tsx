import React, { forwardRef } from "react";
import { cl, composeEventHandlers } from "../../utils/helpers";

interface CoachmarkDotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactElement;
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
    { children, onClick, className, animation, durationInMs, ...restProps },
    forwardedRef,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    };

    const Dot = (
      <button
        {...restProps}
        ref={forwardedRef}
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
