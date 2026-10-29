import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachContext } from "../root/Coach.context";

interface CoachNextTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachNextTriggerProps}
 * @example
 * ```jsx
 *    <Coach.NextTrigger>
 *      <Button>Next step</Button>
 *    </Coach.NextTrigger>
 * ```
 */
const CoachNextTrigger = forwardRef<HTMLButtonElement, CoachNextTriggerProps>(
  ({ children, onClick, ...restProps }, forwardedRef) => {
    const { goToNextStep } = useCoachContext();

    return (
      <Slot
        type="button"
        {...restProps}
        ref={forwardedRef}
        data-coach-next-trigger
        onClick={composeEventHandlers(onClick, goToNextStep)}
      >
        {children}
      </Slot>
    );
  },
);

export { CoachNextTrigger };
export type { CoachNextTriggerProps };
