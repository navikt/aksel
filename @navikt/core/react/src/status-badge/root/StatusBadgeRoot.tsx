import React, { type HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../../types";
import { BodyShort } from "../../typography";
import { cl } from "../../utils/helpers";

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Element the badge is anchored to, positioned in the corner given by `placement`.
   * Leave empty to render the badge standalone.
   */
  children?: React.ReactNode;
  /**
   * Badge color.
   * @default "danger"
   */
  "data-color"?: AkselColor;
  /**
   * The count to display inside the badge.
   * Leave empty to render a status dot.
   */
  count?: number;
  /**
   * The maximum count to display inside the badge. Numbers above is displayed as `maxCount+`.
   * @default 99
   */
  maxCount?: number;
  /**
   * Corner the badge is positioned in. Only applies when `children` is set.
   * @default "top-right"
   */
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * A small badge that communicates status or count.
 *
 * Use standalone for inline status/counts, or pass the element you want to
 * anchor to as `children` to pin the badge to one of its corners.
 *
 * Accessibility: A dot with no label is treated as decorative and
 * hidden from assistive technology. When anchoring to an
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
 * <StatusBadge data-color="danger" count={42} />
 *
 * // Anchored to an element
 * <StatusBadge data-color="danger" aria-hidden count={42}>
 *   <Button icon={<InboxIcon />} aria-label="Innboks, 42 nye meldinger" />
 * </StatusBadge>
 * ```
 */
const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      children,
      className,
      "data-color": color = "danger",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      role,
      "aria-hidden": ariaHidden,
      count,
      maxCount = 99,
      placement = "top-right",
      ...rest
    },
    ref,
  ) => {
    const isDot = count == null;
    const hasLabel = ariaLabel != null || ariaLabelledby != null;
    const isDecorative = isDot && !hasLabel;

    const badge = (
      <BodyShort
        {...rest}
        ref={ref}
        as="span"
        size="small"
        data-color={color}
        data-dot={isDot || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        role={role ?? (hasLabel ? "img" : undefined)}
        aria-hidden={ariaHidden ?? (isDecorative || undefined)}
        className={cl("aksel-status-badge", className)}
      >
        {isDot ? null : count > maxCount ? `${maxCount}+` : count}
      </BodyShort>
    );

    if (children == null) {
      return badge;
    }

    return (
      <span className="aksel-status-badge__anchor" data-placement={placement}>
        {children}
        {badge}
      </span>
    );
  },
);

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace StatusBadge {
  export type Props = StatusBadgeProps;
}

// eslint-disable-next-line import/export
export { StatusBadge };
