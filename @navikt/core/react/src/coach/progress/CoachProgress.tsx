import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import type { ComponentTranslation } from "../../utils/i18n/i18n.types";
import { useCoachContext } from "../root/Coach.context";

interface CoachProgressProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "children"
> {
  translations?: ComponentTranslation<"Coach">;
}

/**
 * @see 🏷️ {@link CoachProgressProps}
 * @example
 * ```jsx
 *  <Coach.Step>
 *      <Coach.Progress />
 *      <Coach.Title>Coach title</Coach.Title>
 *      <Coach.Description>Coach description</Coach.Description>
 *  </Coach.Step>
 * ```
 */
const CoachProgress = forwardRef<HTMLParagraphElement, CoachProgressProps>(
  ({ className, translations, ...restProps }, forwardedRef) => {
    const { currentStepIndex, totalSteps } = useCoachContext();
    const readableCurrentStep = currentStepIndex + 1;

    const translate = useI18n("Coach", translations);

    if (totalSteps <= 1) {
      return null;
    }

    return (
      <BodyShort
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coach__progress", className)}
        data-color="neutral"
        textColor="subtle"
      >
        {translate("currentStep", {
          current: readableCurrentStep,
          total: totalSteps,
        })}
      </BodyShort>
    );
  },
);

export { CoachProgress };
export type { CoachProgressProps };
