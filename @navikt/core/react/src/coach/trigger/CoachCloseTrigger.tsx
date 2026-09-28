import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachContext } from "../root/Coach.context";

interface CoachCloseTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachCloseTriggerProps}
 * @example
 * ```jsx
 *    <Coach.CloseTrigger>
 *      <Button>Close coach</Button>
 *    </Coach.CloseTrigger>
 * ```
 */
const CoachCloseTrigger = forwardRef<HTMLButtonElement, CoachCloseTriggerProps>(
  ({ children, onClick, ...restProps }, forwardedRef) => {
    const { tourStarted: open, onClose } = useCoachContext();

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (open) {
        onClose?.(event);
      }
    };

    return (
      <Slot
        type="button"
        {...restProps}
        ref={forwardedRef}
        data-coach-close-trigger
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        {children}
      </Slot>
    );
  },
);

export { CoachCloseTrigger };
export type { CoachCloseTriggerProps };
