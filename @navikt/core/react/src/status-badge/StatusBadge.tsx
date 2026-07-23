import React, { type HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../types";
import { BodyShort } from "../typography";
import { cl } from "../utils/helpers";
import { StatusBadgeAnchor } from "./StatusBadgeAnchor";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content. Leave empty to render a status dot.
   * Numbers should be pre-formatted by the consumer (e.g. `"42+"`).
   */
  children?: React.ReactNode;
  /**
   * Badge color.
   * @default "danger"
   */
  "data-color"?: AkselColor;
}

/**
 * A small badge that communicates status, presence or a count.
 *
 * Use standalone for inline status/counts, or place it inside
 * `StatusBadge.Anchor` to pin it to a corner of another element.
 *
 * Accessibility: labelling props (`aria-label`, `aria-labelledby`, `role`,
 * `title`) are applied to the badge element. A dot with no label is treated
 * as decorative and hidden from assistive technology. When anchoring to an
 * interactive element, prefer folding the status into that element's
 * accessible name (e.g. `aria-label="Innboks, 42 nye meldinger"`).
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/status-badge)
 * @see 🏷️ {@link StatusBadgeProps}
 *
 * @example
 * ```jsx
 * // Standalone
 * <StatusBadge data-color="success" aria-label="Aktiv" />
 * <StatusBadge data-color="danger">42+</StatusBadge>
 *
 * // Anchored to an element
 * <StatusBadge.Anchor placement="top-right">
 *   <Button icon={<InboxIcon />} aria-label="Innboks, 42 nye meldinger" />
 *   <StatusBadge data-color="danger">42</StatusBadge>
 * </StatusBadge.Anchor>
 * ```
 */
const StatusBadgeRoot = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      children,
      className,
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      title,
      role,
      ...rest
    },
    ref,
  ) => {
    const isDot = children == null || children === "";
    const hasLabel =
      ariaLabel != null || ariaLabelledby != null || title != null;
    const isDecorative = isDot && !hasLabel;

    return (
      <BodyShort
        {...rest}
        ref={ref}
        as="span"
        size="small"
        data-color={color}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        title={title}
        role={role ?? (hasLabel ? "img" : undefined)}
        aria-hidden={isDecorative || undefined}
        className={cl("aksel-status-badge", className, {
          "aksel-status-badge--dot": isDot,
        })}
      >
        {!isDot && children}
      </BodyShort>
    );
  },
);

export const StatusBadge = Object.assign(StatusBadgeRoot, {
  /**
   * @see 🏷️ {@link StatusBadgeAnchorProps}
   */
  Anchor: StatusBadgeAnchor,
});

export default StatusBadge;
