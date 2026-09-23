import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { cl } from "../../utils/helpers";
import { useCoachmarkContext } from "../root/Coachmark.context";

type CoachmarkProgressProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "children"
>;

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
>(({ className, ...restProps }, forwardedRef) => {
  const { currentStepIndex, totalSteps } = useCoachmarkContext();
  const readableCurrentStep = currentStepIndex + 1;

  // TODO:C Add support for translation

  return (
    <BodyShort
      {...restProps}
      ref={forwardedRef}
      className={cl("aksel-coachmark__progress", className)}
      data-color="neutral"
      textColor="subtle"
    >
      {`${readableCurrentStep} av ${totalSteps}`}
    </BodyShort>
  );
});

export { CoachmarkProgress };
export type { CoachmarkProgressProps };
