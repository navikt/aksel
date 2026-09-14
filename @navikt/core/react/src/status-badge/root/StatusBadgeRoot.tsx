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
   * The count to display inside the badge, normalized to a non-negative integer.
   * Leave empty to render a status dot.
   */
  count?: number;
  /**
   * The maximum count to display inside the badge, normalized to a non-negative integer.
   * Numbers above are displayed as `maxCount+`.
   * @default 99
   */
  maxCount?: number;
}

/**
 * A small badge that communicates status or count.
 *
 * Use standalone for inline status/counts, or pass the element you want to
 * anchor to as `children` to pin the badge to one of its corners.
 *
 * Accessibility: A badge with no label is treated as decorative when it is a
 * dot or anchored to another element. When anchoring to an interactive element,
 * fold the status into that element's accessible name
 * (e.g. `aria-label="Innboks, 42 nye meldinger"`).
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
 * <StatusBadge data-color="danger" count={42}>
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
      ...rest
    },
    ref,
  ) => {
    const normalizedCount =
      count == null ? undefined : normalizeCount(count, 0);
    const normalizedMaxCount = normalizeCount(maxCount, 99);
    const isDot = normalizedCount == null;
    const hasLabel =
      Boolean(ariaLabel?.trim()) || Boolean(ariaLabelledby?.trim());
    const isDecorative =
      role == null && !hasLabel && (isDot || children != null);

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
        {isDot
          ? null
          : normalizedCount > normalizedMaxCount
            ? `${normalizedMaxCount}+`
            : normalizedCount}
      </BodyShort>
    );

    if (children == null) {
      return badge;
    }

    return (
      <span className="aksel-status-badge__anchor">
        {children}
        {badge}
      </span>
    );
  },
);

function normalizeCount(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : fallback;
}

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace StatusBadge {
  export type Props = StatusBadgeProps;
}

// eslint-disable-next-line import/export
export { StatusBadge };
