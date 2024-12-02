import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { DefaultIllustration } from "./Illustration";
import { SpeechBubbleArrow } from "./SpeechBubbleArrow";

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

  noSVG?: boolean;
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
  ({ children, className, illustration, poster, noSVG, ...rest }, ref) => {
    let layout: "responsive" | "poster" | "not-poster";
    if (poster === undefined) {
      layout = "responsive";
    } else if (poster) {
      layout = "poster";
    } else {
      layout = "not-poster";
    }
    return (
      <div
        {...rest}
        ref={ref}
        data-layout={layout}
        className={cl(
          noSVG ? "navds-guide-panel-nosvg" : "navds-guide-panel",
          className,
        )}
      >
        <div className="navds-guide">
          {illustration ?? <DefaultIllustration />}
        </div>
        <div className="navds-guide-panel__content">
          <SpeechBubbleArrow />
          <div className="arrow-container">
            <div className="arrow-node-1" />
            <div className="arrow-node-2" />
          </div>
          {children}
        </div>
      </div>
    );
  },
);

export default GuidePanel;
