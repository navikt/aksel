import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachContext } from "../root/Coach.context";

interface CoachPreviousTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachPreviousTriggerProps}
 * @example
 * ```jsx
 *    <Coach.PreviousTrigger>
 *      <Button>Previous step</Button>
 *    </Coach.PreviousTrigger>
 * ```
 */
const CoachPreviousTrigger = forwardRef<
  HTMLButtonElement,
  CoachPreviousTriggerProps
>(({ children, onClick, ...restProps }, forwardedRef) => {
  const { goToPreviousStep } = useCoachContext();

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

export { CoachPreviousTrigger };
export type { CoachPreviousTriggerProps };
