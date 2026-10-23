import { consoleWarning } from "../utils/helpers/consoleWarning";
import type { CoachStepItem } from "./types";

function missingTriggersWarning(
  activeStep: number,
  stepsLength: number,
  currentStep: CoachStepItem,
  container: HTMLElement | null,
) {
  if (
    !container?.isConnected ||
    container.getAttribute("data-coach-step-id") !== currentStep.id
  ) {
    return;
  }

  const hasNextTrigger = Boolean(
    container.querySelector("[data-coach-next-trigger]"),
  );
  const hasPreviousTrigger = Boolean(
    container.querySelector("[data-coach-previous-trigger]"),
  );
  const hasCloseTrigger = Boolean(
    container.querySelector(
      "[data-coach-close-trigger]:not([data-coach-top-close-trigger])",
    ),
  );

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === stepsLength - 1;

  if (!isLastStep && !hasNextTrigger) {
    consoleWarning(
      `Step "${currentStep.id}" is missing a <Coach.NextTrigger>. Steps that are not the last step should have a next trigger to allow navigation.`,
    );
  }

  if (!isFirstStep && !hasPreviousTrigger) {
    consoleWarning(
      `Step "${currentStep.id}" is missing a <Coach.PreviousTrigger>. Steps that are not the first step should have a previous trigger to allow navigation.`,
    );
  }

  if (isLastStep && !hasCloseTrigger) {
    consoleWarning(
      `Step "${currentStep.id}" is missing a <Coach.CloseTrigger>. The last step should have a close trigger to finish the tour.`,
    );
  }
}

export { missingTriggersWarning };
