import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl } from "../../utils/helpers";
import type { SpacingScale } from "../../utils/hooks/base-primitive/helpers/types";
import { useCoachContext } from "../root/Coach.context";

type CoachMarkProps = React.ButtonHTMLAttributes<HTMLDivElement> &
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
 * <Coach type="dialog" title="Help">
 *   <Coach.ShowTourTrigger>
 *     <Coach.Mark>
 *       <Button>Target</Button>
 *     </Coach.Mark>
 *   </Coach.ShowTourTrigger>
 * </Coach>
 * ```
 */
const CoachMark = forwardRef<HTMLDivElement, CoachMarkProps>(
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

    const Mark = (
      <div
        {...(!children ? restProps : {})}
        ref={!children ? forwardedRef : undefined}
        data-color={color}
        aria-hidden
        className={cl("aksel-coach__mark-container", className)}
        style={containerStyle}
      >
        <div className="aksel-coach__mark-pulse" />
        <div className="aksel-coach__mark" />
      </div>
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
      <div
        {...restProps}
        ref={forwardedRef}
        className="aksel-coach__mark-anchor"
      >
        {children}
        {Mark}
      </div>
    );
  },
);

export { CoachMark };
export type { CoachMarkProps };
