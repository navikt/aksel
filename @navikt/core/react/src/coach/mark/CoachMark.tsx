import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import type { SpacingScale } from "../../utils/hooks/base-primitive/helpers/types";
import { useCoachContext } from "../root/Coach.context";

type CoachMarkProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ({
    /**
     * Opens the tour when used inside Coach.
     * Outside Coach, use onClick to handle the mark interaction.
     *
     * Badge color.
     * @default "danger"
     * @see 🏷️ {@link AkselColor}
     * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
     */
    "data-color"?: AkselColor;
  } & (
    | {
        /**
         * Element the coach mark is anchored to.
         * Leave empty to render the mark standalone.
         */
        children: React.ReactElement;
        /**
         * Offset for the coach mark relative to its anchor.
         * @default "space-16"
         */
        offset?: SpacingScale | `${SpacingScale} ${SpacingScale}`;
      }
    | { children?: never; offset?: never }
  ));

/**
 * @see 🏷️ {@link CoachMarkProps}
 * @example
 * ```jsx
 * <Coach>
 *    <Coach.Mark>
 *      <Button>Next step</Button>
 *    </Coach.Mark>
 * </Coach>
 * ```
 */
const CoachMark = forwardRef<HTMLButtonElement, CoachMarkProps>(
  (
    {
      children,
      onClick,
      className,
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-hidden": ariaHidden,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const coach = useCoachContext(false);

    if (coach === undefined && onClick === undefined) {
      consoleWarning(
        "Coach.Mark used outside of Coach and without onClick handler.",
      );
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      coach?.openTour?.();
    };

    const offset =
      "offset" in restProps ? (restProps.offset ?? "space-16") : "space-16";
    const offsetValues = offset.split(" ");
    const offsetX = offsetValues[0] ?? "space-16";
    const offsetY = offsetValues[1] ?? offsetX;

    const containerStyle = children
      ? {
          transform: `translate(var(--ax-${offsetX}), calc(-1 * var(--ax-${offsetY})))`,
          ...style,
        }
      : style;

    const Mark = (
      <button
        {...restProps}
        ref={forwardedRef}
        data-color={color}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={ariaHidden}
        aria-haspopup="dialog"
        className={cl("aksel-coach__mark-container", className)}
        style={containerStyle}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div className="aksel-coach__mark-pulse" />
        <div className="aksel-coach__mark" />
      </button>
    );

    // If tour is disabled, only render the children without the mark
    if (coach?.disableTour) {
      return children ?? null;
    }

    // If there are no children, only render the mark itself
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
