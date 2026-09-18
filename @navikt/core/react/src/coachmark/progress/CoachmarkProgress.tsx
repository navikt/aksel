import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { cl } from "../../utils/helpers";
import { useCoachmarkContext } from "../root/Coachmark.context";

interface CoachmarkProgressProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "children"
> {
  /**
   * Text to display for the progress, e.g., "1 av 3".
   * @default "av"
   */
  ofText?: string;
  /**
   * Alternative text for the progress, e.g., "1 / 3".
   */
  alternativeText?: (currentStep: number, totalSteps: number) => string;
  // TODO: Which prop is best? Better prop name?
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
>(
  (
    { className, ofText = "av", alternativeText, ...restProps },
    forwardedRef,
  ) => {
    const { currentStepIndex, totalSteps } = useCoachmarkContext();
    const readableCurrentStep = currentStepIndex + 1;

    return (
      <BodyShort
        {...restProps}
        ref={forwardedRef}
        className={cl("aksel-coachmark__progress", className)}
        data-color="neutral"
        textColor="subtle"
      >
        {alternativeText
          ? alternativeText(readableCurrentStep, totalSteps)
          : `${readableCurrentStep} ${ofText} ${totalSteps}`}
      </BodyShort>
    );
  },
);

export { CoachmarkProgress };
export type { CoachmarkProgressProps };
