import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachmarkContext } from "../root/Coachmark.context";

interface CoachmarkPreviousTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachmarkPreviousTriggerProps}
 * @example
 * ```jsx
 *    <Coachmark.PreviousTrigger>
 *      <Button>Previous step</Button>
 *    </Coachmark.PreviousTrigger>
 * ```
 */
const CoachmarkPreviousTrigger = forwardRef<
  HTMLButtonElement,
  CoachmarkPreviousTriggerProps
>(({ children, onClick, ...restProps }, forwardedRef) => {
  const { goToPreviousStep } = useCoachmarkContext();

  return (
    <Slot
      type="button"
      {...restProps}
      ref={forwardedRef}
      onClick={composeEventHandlers(onClick, goToPreviousStep)}
    >
      {children}
    </Slot>
  );
});

export { CoachmarkPreviousTrigger };
export type { CoachmarkPreviousTriggerProps };
