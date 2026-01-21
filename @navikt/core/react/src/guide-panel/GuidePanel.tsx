import React, { HTMLAttributes, forwardRef } from "react";
import { useThemeInternal } from "../theme/Theme";
import { cl } from "../utils/helpers";
import { GudiepanelIllustration } from "./Illustration";

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
  (
    {
      children,
      className,
      illustration,
      poster,
      "data-color": color = "info",
      ...rest
    },
    ref,
  ) => {
    const themeContext = useThemeInternal();

    return (
      <div
        data-color={color}
        {...rest}
        ref={ref}
        className={cl("aksel-guide-panel", className)}
        data-responsive={poster === undefined}
        data-poster={poster}
      >
        <div className="aksel-guide">
          {illustration ?? <GudiepanelIllustration />}
        </div>
        <div className="aksel-guide-panel__content">
          <svg
            viewBox="0 0 33 22"
            width="33"
            height="22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="aksel-guide-panel__tail"
          >
            <path
              d="M8.74229e-08 22L0 20L33 20V22L8.74229e-08 22Z"
              fill="var(--ax-bg-raised)"
            />
            <path
              d="M31 20.0001L2 20.0001C2.09817 10.0296 3 7.00011 6 2.00011C8 12.5001 20 20.0001 31 20.0001Z"
              fill="var(--ax-bg-raised)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 20C-2.87106e-10 19.9934 3.21047e-05 19.987 9.68646e-05 19.9804C0.0494722 14.9659 0.299239 11.5341 0.964025 8.68212C1.64231 5.77217 2.72947 3.56367 4.28501 0.971094C4.71185 0.259692 5.53358 -0.114327 6.35038 0.0310157C7.16718 0.176359 7.80944 0.810884 7.96467 1.62586C8.84145 6.22896 11.9453 10.3172 16.2599 13.2908C20.5715 16.2623 25.9294 18.0001 31 18.0001C32.1046 18.0001 33 18.8954 33 20L0 20ZM6.755 4.70521C8.97688 10.7068 14.4934 15.469 20.8803 18.0001C24.1345 19.2897 27.6146 20.0001 31 20.0001L2 20.0001C2.00689 19.3003 2.01774 18.6346 2.033 18.0001C2.19625 11.2107 2.86405 7.98363 4.58479 4.54371C4.9944 3.72487 5.46367 2.89399 6 2.00011C6.17639 2.92619 6.43058 3.82889 6.755 4.70521Z"
              fill="var(--ax-border-default)"
            />
          </svg>
          <div
            className="aksel-guide-panel__content-inner"
            data-color={themeContext?.color}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export default GuidePanel;
