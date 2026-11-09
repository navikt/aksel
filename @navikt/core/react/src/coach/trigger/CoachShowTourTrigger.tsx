import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useCoachContext } from "../root/Coach.context";

interface CoachShowTourTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

/**
 * @see 🏷️ {@link CoachShowTourTriggerProps}
 * @example
 * ```jsx
 *    <Coach.ShowTourTrigger>
 *      <Button>Show tour</Button>
 *    </Coach.ShowTourTrigger>
 * ```
 */
const CoachShowTourTrigger = forwardRef<
  HTMLButtonElement,
  CoachShowTourTriggerProps
>(
  (
    { children, onClick, "aria-label": ariaLabel, ...restProps },
    forwardedRef,
  ) => {
    const { showTour, onClose, openTour, disableTour } = useCoachContext();

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (disableTour) {
        return;
      }
      if (showTour) {
        onClose?.(event);
      } else {
        openTour?.();
      }
    };

    return (
      <Slot
        type="button"
        {...restProps}
        ref={forwardedRef}
        aria-haspopup="dialog"
        aria-label={ariaLabel ?? "Åpne veiledning"}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        {children}
      </Slot>
    );
  },
);

export { CoachShowTourTrigger };
export type { CoachShowTourTriggerProps };
