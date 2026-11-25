import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import type { SpacingScale } from "../../utils/hooks/base-primitive/helpers/types";
import { useCoachContext } from "../root/Coach.context";

type CoachBeaconProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ({
    /**
     * Badge color.
     * @default "danger"
     * @see 🏷️ {@link AkselColor}
     * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
     */
    "data-color"?: AkselColor;
  } & (
    | {
        /**
         * Element the coach beacon is anchored to.
         * Leave empty to render the beacon standalone.
         */
        children: React.ReactElement;
        /**
         * Offset for the coach beacon relative to its anchor.
         * @default "space-16"
         */
        offset?: SpacingScale | `${SpacingScale} ${SpacingScale}`;
      }
    | { children?: never; offset?: never }
  ));

/**
 * @see 🏷️ {@link CoachBeaconProps}
 * @example
 * ```jsx
 * <Coach type="dialog" title="Help">
 *   <Coach.Trigger>
 *     <Coach.Beacon>
 *       <Button>Target</Button>
 *     </Coach.Beacon>
 *   </Coach.Trigger>
 * </Coach>
 * ```
 */
const CoachBeacon = forwardRef<HTMLButtonElement, CoachBeaconProps>(
  (
    {
      children,
      className,
      onClick,
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
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

    const Beacon = (
      <button
        type="button"
        {...restProps}
        ref={forwardedRef}
        data-color={color}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup="dialog"
        className={cl("aksel-coach__beacon-container", className)}
        style={containerStyle}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div className="aksel-coach__beacon-pulse" />
        <div className="aksel-coach__beacon" />
      </button>
    );

    // If tour is disabled, only render the children without the beacon
    if (coach?.disableTour) {
      return children ?? null;
    }

    // If there are no children, only render the beacon itself
    if (!children) {
      return Beacon;
    }

    return (
      <div className="aksel-coach__beacon-anchor">
        {children}
        {Beacon}
      </div>
    );
  },
);

export { CoachBeacon };
export type { CoachBeaconProps };
