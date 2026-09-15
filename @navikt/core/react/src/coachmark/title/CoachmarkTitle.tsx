import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

/* TODO:
  - Title or header?
  - React.Node or string?
 */

type CoachmarkTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link CoachmarkTitleProps}
 * @example
 * ```jsx
 *  <Coachmark.Content>
 *      <Coachmark.Title>Coachmark title</Coachmark.Title>
 *  </Coachmark.Content>
 * ```
 */
const CoachmarkTitle = forwardRef<HTMLHeadingElement, CoachmarkTitleProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coachmark__title", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachmarkTitle };
export type { CoachmarkTitleProps };
