import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import type { ComponentTranslation } from "../../utils/i18n/i18n.types";
import { useCoachmarkContext } from "../root/Coachmark.context";

interface CoachmarkProgressProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "children"
> {
  translations?: ComponentTranslation<"CoachmarkProgress">;
}

/**
 * @see 🏷️ {@link CoachmarkProgressProps}
 * @example
 * ```jsx
 *  <Coachmark.Content>
 *      <Coachmark.Progress />
 *      <Coachmark.Title>Coachmark title</Coachmark.Title>
 *      <Coachmark.Description>Coachmark description</Coachmark.Description>
 *  </Coachmark.Content>
 * ```
 */
const CoachmarkProgress = forwardRef<
  HTMLParagraphElement,
  CoachmarkProgressProps
>(({ className, translations, ...restProps }, forwardedRef) => {
  const { currentStepIndex, totalSteps } = useCoachmarkContext();
  const readableCurrentStep = currentStepIndex + 1;

  const translate = useI18n("CoachmarkProgress", translations);

  return (
    <BodyShort
      {...restProps}
      ref={forwardedRef}
      className={cl("aksel-coachmark__progress", className)}
      data-color="neutral"
      textColor="subtle"
    >
      {translate("currentStep", {
        current: readableCurrentStep,
        total: totalSteps,
      })}
    </BodyShort>
  );
});

export { CoachmarkProgress };
export type { CoachmarkProgressProps };
