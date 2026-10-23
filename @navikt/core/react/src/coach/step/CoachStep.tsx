import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachStepProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachStepProps}
 * @example
 * ```jsx
 *  <Coach.Step>
 *    <Coach.Title>Coach title</Coach.Title>
 *    <Coach.Description>Coach description</Coach.Description>
 *  </Coach.Step>
 * ```
 */
const CoachStep = forwardRef<HTMLDivElement, CoachStepProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__step", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachStep };
export type { CoachStepProps };
