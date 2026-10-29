import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import { Popover } from "../../popover";
import { Portal } from "../../portal";
import { HStack } from "../../primitives/stack";
import { useClientLayoutEffect } from "../../utils-external";
import { FocusBoundary } from "../../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../../utils/components/focus-guards/FocusGuards";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { CoachBackdrop } from "../backdrop/CoachBackdrop";
import {
  CoachDescription,
  type CoachDescriptionProps,
} from "../description/CoachDescription";
import { CoachFooter, type CoachFooterProps } from "../footer/CoachFooter";
import { CoachImage, type CoachImageProps } from "../image/CoachImage";
import { CoachMark, type CoachMarkProps } from "../mark/CoachMark";
import {
  CoachProgress,
  type CoachProgressProps,
} from "../progress/CoachProgress";
import { CoachStep, type CoachStepProps } from "../step/CoachStep";
import { CoachTitle, type CoachTitleProps } from "../title/CoachTitle";
import {
  CoachCloseTrigger,
  type CoachCloseTriggerProps,
} from "../trigger/CoachCloseTrigger";
import {
  CoachNextTrigger,
  type CoachNextTriggerProps,
} from "../trigger/CoachNextTrigger";
import {
  CoachPreviousTrigger,
  type CoachPreviousTriggerProps,
} from "../trigger/CoachPreviousTrigger";
import type {
  CoachAnchorStep,
  CoachDialogStep,
  CoachProps,
  CoachSingleStepProps,
  CoachStepBase,
  CoachStepItem,
  CoachStepTarget,
  CoachTourProps,
} from "../types";
import { missingTriggersWarning } from "../warnings";
import { CoachContextProvider } from "./Coach.context";

/**
 * Guides the user through a sequence of steps, anchored to elements or shown as dialogs.
 *
 * @example
 * ```tsx
 * <Coach
 *   steps={[
 *     { id: "welcome", type: "dialog", title: "Welcome!" },
 *     { id: "start", type: "anchor", anchorRef: buttonRef, title: "Start here." },
 *   ]}
 * >
 *   <Coach.Mark aria-label="Start tour" />
 * </Coach>
 * ```
 */
const CoachRoot = (props: CoachProps) => {
  const {
    showTour: showTourControlled,
    onShowTourChange,
    disableTour = false,
    currentStep: currentStepControlled,
    defaultStep = 0,
    onStepChange,
    translations,
    children,
    renderStep,
  } = props;

  // Translations for the Coach component
  const translate = useI18n("Coach", translations);

  // States
  const [uncontrolledShowTour, setUncontrolledShowTour] = useState(false);
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [titleId, setTitleId] = useState<string>();
  const [stepElement, setStepElement] = useState<HTMLElement | null>(null);

  // Whether the tour should be shown
  const showTour = !disableTour && (showTourControlled ?? uncontrolledShowTour);

  // Generate the steps for the tour based on props or fallback to single step.
  const steps: readonly CoachStepItem[] =
    "steps" in props && props.steps !== undefined
      ? props.steps
      : [
          {
            id: props.id ?? "step-1",
            type: props.type,
            title: props.title,
            description: props.description,
            image: props.image,
            allowToEndTour: props.allowToEndTour ?? true,
            size: props.size,
            width: props.width,
            "aria-labelledby": props["aria-labelledby"],
            ...(props.type === "anchor"
              ? {
                  anchorRef: props.anchorRef,
                  placement: props.placement,
                  offset: props.offset,
                }
              : {}),
          } as CoachStepItem,
        ];

  // Active step index
  const activeStepIndex = currentStepControlled ?? uncontrolledStep;
  // Current step object
  const currentStep = steps[activeStepIndex];
  // Anchor reference for the current step if it's an anchor type
  const anchorRef =
    currentStep?.type === "anchor" ? currentStep.anchorRef : undefined;

  useClientLayoutEffect(() => {
    // Smooth scroll to the anchor element if it's outside the viewport
    const nextAnchorEl = anchorRef?.current ?? null;
    if (!showTour) {
      return;
    }

    if (nextAnchorEl) {
      const { bottom, left, right, top } = nextAnchorEl.getBoundingClientRect();
      const isOutsideViewport =
        top < 0 ||
        left < 0 ||
        bottom > window.innerHeight ||
        right > window.innerWidth;

      if (isOutsideViewport) {
        nextAnchorEl.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      }
    }

    setAnchorEl(nextAnchorEl);
  }, [anchorRef, showTour, activeStepIndex]);

  useEffect(() => {
    // Show warning for missing triggers if the tour is active
    if (!showTour) return;
    missingTriggersWarning(
      activeStepIndex,
      steps.length,
      currentStep,
      stepElement,
    );
  }, [showTour, activeStepIndex, steps.length, currentStep, stepElement]);

  useClientLayoutEffect(() => {
    // Reset uncontrolled step when the tour is hidden
    if (!showTour) {
      setUncontrolledStep(defaultStep);
    }
  }, [defaultStep, showTour]);

  // Get the size and width of the current step, with default values if not specified
  const getStepSize = () => currentStep?.size ?? "medium";
  const getStepWidth = () => currentStep?.width ?? "medium";

  // Function to set the active step index
  const setStep = useCallback(
    (nextStep: number) => {
      if (currentStepControlled === undefined) {
        setUncontrolledStep(nextStep);
      }
      onStepChange?.(nextStep);
    },
    [currentStepControlled, onStepChange],
  );

  // Function to show tour
  const setShowTour = useCallback(
    (open: boolean) => {
      if (showTourControlled === undefined) {
        setUncontrolledShowTour(open);
      }
      onShowTourChange?.(open);
    },
    [onShowTourChange, showTourControlled],
  );

  // Function to end the tour
  const endTour = useCallback(() => setShowTour(false), [setShowTour]);

  // Function to go to the next step in the tour
  const goToNextStep = useCallback(() => {
    if (activeStepIndex === steps.length - 1) {
      endTour();
      return;
    }
    setStep(activeStepIndex + 1);
  }, [activeStepIndex, endTour, setStep, steps.length]);

  // Function to go to the previous step in the tour
  const goToPreviousStep = useCallback(() => {
    if (activeStepIndex > 0) {
      setStep(activeStepIndex - 1);
    }
  }, [activeStepIndex, setStep]);

  useEffect(() => {
    // Handle keyboard navigation for the tour
    if (!showTour) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && activeStepIndex < steps.length - 1) {
        event.preventDefault();
        goToNextStep();
      }

      if (event.key === "ArrowLeft" && activeStepIndex > 0) {
        event.preventDefault();
        goToPreviousStep();
      }

      if (event.key === "Escape" && currentStep?.allowToEndTour) {
        event.preventDefault();
        event.stopPropagation();
        endTour();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [
    activeStepIndex,
    currentStep?.allowToEndTour,
    endTour,
    goToNextStep,
    goToPreviousStep,
    showTour,
    steps.length,
  ]);

  // Function to focus on the next or close trigger within the current step
  const getInitialFocus = () => {
    const nextTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coach-next-trigger]",
    );
    const closeTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coach-close-trigger]",
    );

    const trigger =
      nextTriggers[nextTriggers.length - 1] ??
      closeTriggers[closeTriggers.length - 1];

    if (!trigger) return null;

    trigger.focus?.({ preventScroll: true });

    // Returns undefined to override the default focus behavior of the FocusBoundary and Dialog components
    return undefined;
  };

  // Default content for a step
  const defaultStepContent = (
    <CoachStep>
      {currentStep.allowToEndTour && (
        <HStack
          width="full"
          justify="end"
          marginBlock="space-2"
          className="aksel-coach__top-close-trigger"
        >
          <CoachCloseTrigger data-coach-top-close-trigger>
            <Button
              size="small"
              icon={<XMarkIcon title={translate("close")} />}
              variant="tertiary"
              data-color="neutral"
            />
          </CoachCloseTrigger>
        </HStack>
      )}
      {currentStep?.image && <CoachImage>{currentStep.image}</CoachImage>}
      <CoachProgress />
      {currentStep?.title && <CoachTitle>{currentStep.title}</CoachTitle>}
      {currentStep?.description && (
        <CoachDescription>{currentStep.description}</CoachDescription>
      )}
      <CoachFooter>
        {activeStepIndex > 0 && (
          <CoachPreviousTrigger>
            <Button size={getStepSize()} variant="secondary">
              {translate("previous")}
            </Button>
          </CoachPreviousTrigger>
        )}
        {activeStepIndex === steps.length - 1 ? (
          <CoachCloseTrigger>
            <Button size={getStepSize()} variant="primary">
              {translate("close")}
            </Button>
          </CoachCloseTrigger>
        ) : (
          <CoachNextTrigger>
            <Button size={getStepSize()} variant="primary">
              {translate("next")}
            </Button>
          </CoachNextTrigger>
        )}
      </CoachFooter>
    </CoachStep>
  );

  // Step content, either custom rendered or default content
  const stepContent =
    renderStep?.(
      {
        id: currentStep.id,
        title: currentStep.title,
        description: currentStep.description,
        image: currentStep.image,
      },
      {
        defaultContent: defaultStepContent,
        index: activeStepIndex,
        totalSteps: steps.length,
      },
    ) ?? defaultStepContent;

  // Render the current step based on its type (dialog or anchor)
  const renderCurrentStep = () => {
    const labelledBy = currentStep?.["aria-labelledby"] ?? titleId;

    if (currentStep?.type === "dialog") {
      return (
        <Dialog open={true} size={getStepSize()}>
          <Dialog.Popup
            modal="trap-focus"
            withBackdrop
            ref={setStepElement}
            data-coach-step-id={currentStep.id}
            initialFocusTo={getInitialFocus}
            width={getStepWidth()}
            aria-labelledby={labelledBy}
          >
            <Dialog.Body
              className="aksel-coach__dialog-body"
              data-coach-step-size={getStepSize()}
            >
              {stepContent}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog>
      );
    }

    if (currentStep?.type === "anchor" && anchorEl) {
      return (
        <Portal key={currentStep.id}>
          <CoachBackdrop anchorEl={anchorEl} />
          <FocusGuards>
            <FocusBoundary loop trapped modal initialFocus={getInitialFocus}>
              <Popover
                ref={setStepElement}
                data-coach-step-id={currentStep.id}
                anchorEl={anchorEl}
                open
                onClose={() => {}}
                placement={currentStep.placement}
                offset={currentStep.offset ?? 12}
                role="dialog"
                aria-labelledby={labelledBy}
                className="aksel-coach__popover"
              >
                <Popover.Content
                  className="aksel-coach__popover_content"
                  data-top-close-button={currentStep.allowToEndTour ?? false}
                  data-coach-step-size={getStepSize()}
                  data-coach-step-width={getStepWidth()}
                >
                  {stepContent}
                </Popover.Content>
              </Popover>
            </FocusBoundary>
          </FocusGuards>
        </Portal>
      );
    }

    if (currentStep?.type === "anchor" && !anchorEl) {
      consoleWarning(`Anchor element for step "${currentStep.id}" not found.`);
    }

    endTour();
    return null;
  };

  return (
    <CoachContextProvider
      showTour={showTour}
      openTour={() => setShowTour(true)}
      disableTour={disableTour}
      currentStepSize={getStepSize()}
      onClose={endTour}
      currentStep={currentStep}
      currentStepIndex={activeStepIndex}
      totalSteps={steps.length}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      titleId={titleId}
      setTitleId={setTitleId}
    >
      {children}
      {showTour && renderCurrentStep()}
    </CoachContextProvider>
  );
};

const Coach = Object.assign(CoachRoot, {
  Step: CoachStep,
  Title: CoachTitle,
  Description: CoachDescription,
  CloseTrigger: CoachCloseTrigger,
  Progress: CoachProgress,
  NextTrigger: CoachNextTrigger,
  PreviousTrigger: CoachPreviousTrigger,
  Footer: CoachFooter,
  Image: CoachImage,
  Mark: CoachMark,
});

export {
  Coach,
  CoachStep,
  CoachTitle,
  CoachDescription,
  CoachCloseTrigger,
  CoachProgress,
  CoachNextTrigger,
  CoachPreviousTrigger,
  CoachFooter,
  CoachImage,
  CoachMark,
};

export type {
  CoachAnchorStep,
  CoachDialogStep,
  CoachStepBase,
  CoachStepItem,
  CoachStepTarget,
  CoachProps,
  CoachTourProps,
  CoachSingleStepProps,
  CoachStepProps,
  CoachTitleProps,
  CoachDescriptionProps,
  CoachCloseTriggerProps,
  CoachProgressProps,
  CoachNextTriggerProps,
  CoachPreviousTriggerProps,
  CoachFooterProps,
  CoachImageProps,
  CoachMarkProps,
};
