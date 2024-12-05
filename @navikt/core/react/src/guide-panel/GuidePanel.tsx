import cl from "clsx";
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";
import { DefaultIllustration } from "./Illustration";
import { SpeechBubbleTail } from "./SpeechBubbleTail";

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

const SpeechBubble = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-initial navds-speech-bubble">
      <div className="navds-speech-bubble__tail">
        <SpeechBubbleTail />
      </div>
      <div className="navds-speech-bubble__content">{children}</div>
    </div>
  );
};

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
  ({ children, className, illustration, poster, ...rest }, ref) => {
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
        className={cl("navds-guide-panel", className)}
      >
        <div className="navds-guide">
          {illustration ?? <DefaultIllustration />}
        </div>
        <SpeechBubble>{children}</SpeechBubble>
      </div>
    );
  },
);

export default GuidePanel;
