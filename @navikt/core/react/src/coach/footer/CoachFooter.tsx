import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachFooterProps}
 * @example
 * ```jsx
 *      <Coach.Footer>
 *        <Coach.CloseTrigger>
 *          <Button>Close dialog</Button>
 *        </Coach.CloseTrigger>
 *      </Coach.Footer>
 * ```
 */
const CoachFooter = forwardRef<HTMLDivElement, CoachFooterProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__footer", className)}
        data-coach-footer
      >
        {children}
      </div>
    );
  },
);

export { CoachFooter };
export type { CoachFooterProps };
