import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachContentProps}
 * @example
 * ```jsx
 *  <Coach.Content>
 *    <Coach.Title>Coach title</Coach.Title>
 *    <Coach.Description>Coach description</Coach.Description>
 *  </Coach.Content>
 * ```
 */
const CoachContent = forwardRef<HTMLDivElement, CoachContentProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__content", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachContent };
export type { CoachContentProps };
