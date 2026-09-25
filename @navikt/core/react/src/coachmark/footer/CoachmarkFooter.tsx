import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachmarkFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachmarkFooterProps}
 * @example
 * ```jsx
 *      <Coachmark.Footer>
 *        <Coachmark.CloseTrigger>
 *          <Button>Close dialog</Button>
 *        </Coachmark.CloseTrigger>
 *      </Coachmark.Footer>
 * ```
 */
const CoachmarkFooter = forwardRef<HTMLDivElement, CoachmarkFooterProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coachmark__footer", className)}
        data-coachmark-footer
      >
        {children}
      </div>
    );
  },
);

export { CoachmarkFooter };
export type { CoachmarkFooterProps };
