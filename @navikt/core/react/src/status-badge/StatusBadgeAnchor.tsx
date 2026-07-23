import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../utils/helpers";

export interface StatusBadgeAnchorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The anchored element followed by a `StatusBadge`.
   * The `StatusBadge` is positioned in the corner given by `placement`.
   */
  children: React.ReactNode;
  /**
   * Corner the `StatusBadge` is positioned in.
   * @default "top-right"
   */
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Positions a `StatusBadge` in a corner of another element.
 * Provides the `position: relative` container, so consumers don't have to.
 *
 * @see 🏷️ {@link StatusBadgeAnchorProps}
 *
 * @example
 * ```jsx
 * <StatusBadge.Anchor placement="top-right">
 *   <Button icon={<InboxIcon />} aria-label="Innboks, 42 nye meldinger" />
 *   <StatusBadge data-color="danger">42</StatusBadge>
 * </StatusBadge.Anchor>
 * ```
 */
export const StatusBadgeAnchor = forwardRef<
  HTMLSpanElement,
  StatusBadgeAnchorProps
>(({ children, className, placement = "top-right", ...rest }, ref) => {
  return (
    <span
      {...rest}
      ref={ref}
      data-placement={placement}
      className={cl("aksel-status-badge__anchor", className)}
    >
      {children}
    </span>
  );
});

export default StatusBadgeAnchor;
