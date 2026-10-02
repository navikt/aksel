import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link CoachTitleProps}
 * @example
 * ```jsx
 *  <Coach.Content>
 *      <Coach.Title>Coach title</Coach.Title>
 *  </Coach.Content>
 * ```
 */
const CoachTitle = forwardRef<HTMLHeadingElement, CoachTitleProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__title", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachTitle };
export type { CoachTitleProps };
