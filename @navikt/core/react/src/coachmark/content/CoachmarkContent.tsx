import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachmarkContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachmarkContentProps}
 * @example
 * ```jsx
 *  <Coachmark.Content>
 *    <Coachmark.Title>Coachmark title</Coachmark.Title>
 *    <Coachmark.Description>Coachmark description</Coachmark.Description>
 *  </Coachmark.Content>
 * ```
 */
const CoachmarkContent = forwardRef<HTMLDivElement, CoachmarkContentProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coachmark__content", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachmarkContent };
export type { CoachmarkContentProps };
