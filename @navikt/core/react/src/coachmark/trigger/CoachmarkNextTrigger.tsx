import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachmarkContext } from "../root/Coachmark.context";

interface CoachmarkNextTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachmarkNextTriggerProps}
 * @example
 * ```jsx
 *    <Coachmark.NextTrigger>
 *      <Button>Next step</Button>
 *    </Coachmark.NextTrigger>
 * ```
 */
const CoachmarkNextTrigger = forwardRef<
  HTMLButtonElement,
  CoachmarkNextTriggerProps
>(({ children, onClick, ...restProps }, forwardedRef) => {
  const { goToNextStep } = useCoachmarkContext();

  return (
    <Slot
      type="button"
      {...restProps}
      ref={forwardedRef}
      data-coachmark-next-trigger
      onClick={composeEventHandlers(onClick, goToNextStep)}
    >
      {children}
    </Slot>
  );
});

export { CoachmarkNextTrigger };
export type { CoachmarkNextTriggerProps };
