import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachmarkContext } from "../context/Coachmark.context";

interface CoachmarkCloseTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachmarkCloseTriggerProps}
 * @example
 * ```jsx
 *    <Coachmark.CloseTrigger>
 *      <Button>Close coachmark</Button>
 *    </Coachmark.CloseTrigger>
 * ```
 */
const CoachmarkCloseTrigger = forwardRef<
  HTMLButtonElement,
  CoachmarkCloseTriggerProps
>(({ children, onClick, ...restProps }, forwardedRef) => {
  const { tourStarted: open, onClose } = useCoachmarkContext();

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
      onClick={composeEventHandlers(onClick, handleClick)}
    >
      {children}
    </Slot>
  );
});

export { CoachmarkCloseTrigger };
export type { CoachmarkCloseTriggerProps };
