import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { DefaultIllustration } from "./Illustration";

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
   * Render illustation above content
   * @default true on mobile (<480px)
   */
  poster?: boolean;
}

/**
 * A component for guiding users on the website
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
  ({ children, className, illustration, poster, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl(
        "navds-guide-panel",
        className,
        `navds-guide-panel--poster-${poster}`
      )}
    >
      <div className="navds-guide-panel__guide">
        {illustration ?? <DefaultIllustration />}
      </div>
      <div className="navds-guide-panel__content">{children}</div>
    </div>
  )
);

export default GuidePanel;
