import React, { forwardRef } from "react";

/**
 * TODO:
 * [ ] Context ?
 * [ ] Use Portal
 * [ ] FocusGuard and FocusBoundary
 * [ ] Role dialog
 * [ ] Aria-modal
 * [ ] Accessibility
 */

export interface CoachmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be highlighted by the coachmark
   */
  children: React.ReactNode;
}

/**
 * Coachmark component for highlighting and providing guidance on UI elements
 *
 * @example
 * ```tsx
 * <Coachmark>
 *   <button>Get Started</button>
 * </Coachmark      >
 * ```
 */
const Coachmark = forwardRef<HTMLDivElement, CoachmarkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} data-testid="coachmark" {...rest}>
        {children}
      </div>
    );
  },
);

export default Coachmark;
