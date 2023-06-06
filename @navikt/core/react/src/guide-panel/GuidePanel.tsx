import React, { forwardRef, HTMLAttributes } from "react";
import Guide from "./Guide";
import cl from "clsx";

export interface GuidePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * GuidePanel content
   */
  children: React.ReactNode;
  /**
   * Custom svg/img element
   */
  illustration?: React.ReactNode;
  /**
   * Poster positions guide-illustation above content
   * @default false, renders illustation left of content
   */
  poster?: boolean;
}

/**
 * A component that displays a guide panel.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/guidepanel)
 * @see 🏷️ {@link GuidePanelProps}
 *
 * @example
 * ```jsx
 * <GuidePanel>
 *   Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
 *   enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
 *   er forlenget.
 * </GuidePanel>
 * ```
 */
export const GuidePanel = forwardRef<HTMLDivElement, GuidePanelProps>(
  (
    { children, className, illustration, poster = false, color, ...rest },
    ref
  ) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-guide-panel", className, {
        "navds-guide-panel--poster": poster,
      })}
    >
      <Guide size={poster ? "medium" : "small"} illustration={illustration} />
      <div className="navds-guide-panel__content">{children}</div>
    </div>
  )
);

export default GuidePanel;
