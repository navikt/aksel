import React, { type HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../types";
import { BodyShort } from "../typography";
import { cl } from "../utils/helpers";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content. Leave empty to render a status dot.
   * Numbers should be pre-formatted by the consumer (e.g. `"42+"`).
   */
  children?: React.ReactNode;
  /**
   * Anchors the badge to a corner of the nearest positioned ancestor.
   * When set, the consumer must provide a `position: relative` container.
   * Leave undefined to render inline/standalone.
   */
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Badge color.
   * @default "danger"
   */
  "data-color"?: AkselColor;
}

/**
 * A small badge that communicates status, presence or a count.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/status-badge)
 * @see 🏷️ {@link StatusBadgeProps}
 *
 * @example
 * ```jsx
 * <StatusBadge data-color="success" aria-label="Aktiv" />
 * <StatusBadge data-color="danger">42+</StatusBadge>
 * ```
 */
export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    { children, className, placement, "data-color": color = "danger", ...rest },
    ref,
  ) => {
    const isDot = children == null || children === "";

    return (
      <BodyShort
        {...rest}
        ref={ref}
        as="span"
        size="small"
        data-color={color}
        data-placement={placement}
        className={cl("aksel-status-badge", className, {
          "aksel-status-badge--dot": isDot,
          "aksel-status-badge--floating": placement != null,
        })}
      >
        {!isDot && children}
      </BodyShort>
    );
  },
);

export default StatusBadge;
