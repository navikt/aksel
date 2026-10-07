import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachDescriptionProps}
 * @example
 * ```jsx
 *  <Coach.Content>
 *       <Coach.Title>Coach title</Coach.Title>
 *       <Coach.Description>Coach description</Coach.Description>
 *  </Coach.Content>
 * ```
 */
const CoachDescription = forwardRef<HTMLDivElement, CoachDescriptionProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__description", className)}
      >
        {children}
      </div>
    );
  },
);

export { CoachDescription };
export type { CoachDescriptionProps };
