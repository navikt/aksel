import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl } from "../../utils/helpers";
import type { SpacingScale } from "../../utils/hooks/base-primitive/helpers/types";
import { useCoachContext } from "../root/Coach.context";

type CoachBeaconProps = React.ButtonHTMLAttributes<HTMLDivElement> &
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
const CoachBeacon = forwardRef<HTMLDivElement, CoachBeaconProps>(
  (
    {
      children,
      className,
      "data-color": color = "danger",
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const coach = useCoachContext(false);

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
      <div
        {...(!children ? restProps : {})}
        ref={!children ? forwardedRef : undefined}
        data-color={color}
        aria-hidden
        className={cl("aksel-coach__beacon-container", className)}
        style={containerStyle}
      >
        <div className="aksel-coach__beacon-pulse" />
        <div className="aksel-coach__beacon" />
      </div>
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
      <div
        {...restProps}
        ref={forwardedRef}
        className="aksel-coach__beacon-anchor"
      >
        {children}
        {Beacon}
      </div>
    );
  },
);

export { CoachBeacon };
export type { CoachBeaconProps };
