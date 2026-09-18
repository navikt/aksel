import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type CoachmarkDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachmarkDescriptionProps}
 * @example
 * ```jsx
 *  <Coachmark.Content>
 *       <Coachmark.Title>Coachmark title</Coachmark.Title>
 *       <Coachmark.Description>Coachmark description</Coachmark.Description>
 *  </Coachmark.Content>
 * ```
 */
const CoachmarkDescription = forwardRef<
  HTMLDivElement,
  CoachmarkDescriptionProps
>(({ className, children, ...restProps }, forwardedRef) => {
  return (
    <div
      {...restProps}
      ref={forwardedRef}
      className={cl("aksel-coachmark__description", className)}
    >
      {children}
    </div>
  );
});

export { CoachmarkDescription };
export type { CoachmarkDescriptionProps };
