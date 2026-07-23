import React, { type HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../types";
import { BodyShort } from "../typography";
import { cl } from "../utils/helpers";

export interface StatusBadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "content"
> {
  /**
   * The element the badge is anchored to. When provided, the badge is
   * positioned in a corner of this element (see `placement`).
   * Leave empty to render the badge standalone/inline.
   */
  children?: React.ReactNode;
  /**
   * Badge content. Leave empty to render a status dot.
   * Numbers should be pre-formatted by the consumer (e.g. `"42+"`).
   */
  content?: React.ReactNode;
  /**
   * Anchors the badge to a corner of `children`.
   * Only applies when `children` is provided.
   * @default "top-right"
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
 * // Standalone
 * <StatusBadge data-color="success" aria-label="Aktiv" />
 * <StatusBadge content="42+" data-color="danger" />
 *
 * // Anchored to an element
 * <StatusBadge content="42" placement="top-right">
 *   <Button icon={<InboxIcon />} />
 * </StatusBadge>
 * ```
 */
export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      children,
      content,
      className,
      placement = "top-right",
      "data-color": color = "danger",
      ...rest
    },
    ref,
  ) => {
    const isDot = content == null || content === "";
    const isAnchored = children != null;

    return (
      <span
        {...rest}
        ref={ref}
        className={cl("aksel-status-badge__root", className)}
      >
        {children}
        <BodyShort
          as="span"
          size="small"
          data-color={color}
          data-placement={isAnchored ? placement : undefined}
          className={cl("aksel-status-badge", {
            "aksel-status-badge--dot": isDot,
            "aksel-status-badge--floating": isAnchored,
          })}
        >
          {!isDot && content}
        </BodyShort>
      </span>
    );
  },
);

export default StatusBadge;
