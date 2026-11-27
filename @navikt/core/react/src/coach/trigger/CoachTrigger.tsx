import React, { forwardRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { ComponentTranslation } from "../../utils/i18n/i18n.types";
import { useCoachContext } from "../root/Coach.context";

interface CoachTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
  translations?: ComponentTranslation<"Coach">;
}

/**
 * @see 🏷️ {@link CoachTriggerProps}
 * @example
 * ```jsx
 *    <Coach.Trigger>
 *      <Button>Show tour</Button>
 *    </Coach.Trigger>
 * ```
 */
const CoachTrigger = forwardRef<HTMLButtonElement, CoachTriggerProps>(
  (
    { children, onClick, "aria-label": ariaLabel, translations, ...restProps },
    forwardedRef,
  ) => {
    const { showTour, onClose, openTour, disableTour, coachTranslations } =
      useCoachContext();
    const translate = useI18n("Coach", translations, coachTranslations);

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
        aria-label={ariaLabel ?? translate("openCoach")}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        {children}
      </Slot>
    );
  },
);

export { CoachTrigger };
export type { CoachTriggerProps };
