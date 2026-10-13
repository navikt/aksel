import type { CoachStepItem } from "./types";

export function missingTriggersWarning(
  activeStep: number,
  stepsLength: number,
  currentStep: CoachStepItem,
) {
  const hasNextTrigger = Boolean(
    document.querySelector("[data-coach-next-trigger]"),
  );
  const hasPreviousTrigger = Boolean(
    document.querySelector("[data-coach-previous-trigger]"),
  );
  const hasCloseTrigger = Boolean(
    document.querySelector(
      "[data-coach-close-trigger]:not([data-coach-top-close-trigger])",
    ),
  );

  console.log(document.querySelector("[data-coach-next-trigger]"));

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === stepsLength - 1;

  if (!isLastStep && !hasNextTrigger) {
    console.warn(
      `Step "${currentStep.id}" is missing a <Coach.NextTrigger>. Steps that are not the last step should have a next trigger to allow navigation.`,
    );
  }

  if (!isFirstStep && !hasPreviousTrigger) {
    console.warn(
      `Step "${currentStep.id}" is missing a <Coach.PreviousTrigger>. Steps that are not the first step should have a previous trigger to allow navigation.`,
    );
  }

  if (isLastStep && !hasCloseTrigger) {
    console.warn(
      `Step "${currentStep.id}" is missing a <Coach.CloseTrigger>. The last step should have a close trigger to finish the tour.`,
    );
  }
}
