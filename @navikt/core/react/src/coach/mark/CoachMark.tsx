import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl, composeEventHandlers } from "../../utils/helpers";
import type { SpacingScale } from "../../utils/hooks/base-primitive/helpers/types";

type CoachMarkProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
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
        /**
         * Placement of the coach mark relative to its anchor.
         * @default "top-end"
         */
        placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
      }
    | { children?: never; offset?: never; placement?: never }
  ));

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
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-hidden": ariaHidden,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    };

    const placement =
      "placement" in restProps ? (restProps.placement ?? "top-end") : "top-end";
    const blockPlacement = placement.split("-")[0] ?? "top";
    const inlinePlacement = placement.split("-")[1] ?? "end";

    const offset =
      "offset" in restProps ? (restProps.offset ?? "space-16") : "space-16";
    const offsetValues = offset.split(" ");
    const offsetX = offsetValues[0] ?? "space-16";
    const offsetY = offsetValues[1] ?? offsetX;
    const prefixOffsetX = inlinePlacement === "start" ? "-1" : "1";
    const prefixOffsetY = blockPlacement === "top" ? `-1` : `1`;

    const containerStyle = children
      ? {
          [`insetBlock${blockPlacement === "bottom" ? "End" : "Start"}`]: "0",
          [`insetInline${inlinePlacement === "end" ? "End" : "Start"}`]: "0",
          transform: `translate(calc(${prefixOffsetX} * var(--ax-${offsetX})), calc(${prefixOffsetY} * var(--ax-${offsetY})))`,
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
        className={cl("aksel-coach__mark-container", className)}
        style={containerStyle}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <div className="aksel-coach__mark-pulse" />
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
