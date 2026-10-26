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
 *     { type: "dialog", title: "Welcome!" },
 *     { type: "anchor", anchorRef: buttonRef, title: "Start here." },
 *   ]}
 * />
 * ```
 */
const CoachRoot = (props: CoachProps) => {
  const {
    showTour,
    currentStep: currentStepProp,
    defaultStep = 0,
    onStepChange,
    endTour,
    translations,
  } = props;

  const translate = useI18n("Coach", translations);

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

  const renderStep = "renderStep" in props ? props.renderStep : undefined;
  const singleStepChildren = "children" in props ? props.children : undefined;

  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [titleId, setTitleId] = useState<string>();
  const [stepElement, setStepElement] = useState<HTMLElement | null>(null);

  const activeStep = currentStepProp ?? uncontrolledStep;
  const currentStep = steps[activeStep];
  const anchorRef =
    currentStep?.type === "anchor" ? currentStep.anchorRef : undefined;

  const getStepSize = () => currentStep?.size ?? "medium";
  const getStepWidth = () => currentStep?.width ?? "medium";

  useClientLayoutEffect(() => {
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
  }, [anchorRef, showTour, activeStep]);

  useEffect(() => {
    if (!showTour) return;
    missingTriggersWarning(activeStep, steps.length, currentStep, stepElement);
  }, [showTour, activeStep, steps.length, currentStep, stepElement]);

  useClientLayoutEffect(() => {
    if (!showTour) {
      setUncontrolledStep(defaultStep);
    }
  }, [defaultStep, showTour]);

  const setStep = useCallback(
    (nextStep: number) => {
      if (currentStepProp === undefined) {
        setUncontrolledStep(nextStep);
      }
      onStepChange?.(nextStep);
    },
    [currentStepProp, onStepChange],
  );

  const goToNextStep = useCallback(() => {
    if (activeStep === steps.length - 1) {
      endTour();
      return;
    }
    setStep(activeStep + 1);
  }, [activeStep, endTour, setStep, steps.length]);

  const goToPreviousStep = useCallback(() => {
    if (activeStep > 0) {
      setStep(activeStep - 1);
    }
  }, [activeStep, setStep]);

  useEffect(() => {
    if (!showTour) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && activeStep < steps.length - 1) {
        event.preventDefault();
        goToNextStep();
      }

      if (event.key === "ArrowLeft" && activeStep > 0) {
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
    activeStep,
    currentStep?.allowToEndTour,
    endTour,
    goToNextStep,
    goToPreviousStep,
    showTour,
    steps.length,
  ]);

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

  const currentStepContent = (
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
        {activeStep > 0 && (
          <CoachPreviousTrigger>
            <Button size={getStepSize()} variant="secondary">
              {translate("previous")}
            </Button>
          </CoachPreviousTrigger>
        )}
        {activeStep === steps.length - 1 ? (
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

  const resolveSingleStepChildren = () => {
    if (!singleStepChildren) {
      return undefined;
    }

    if (typeof singleStepChildren === "function") {
      return singleStepChildren({
        defaultContent: currentStepContent,
        title: currentStep.title,
        description: currentStep.description,
        image: currentStep.image,
      });
    }

    return <CoachStep>{singleStepChildren}</CoachStep>;
  };

  const stepContent =
    resolveSingleStepChildren() ??
    renderStep?.(
      {
        id: currentStep.id,
        title: currentStep.title,
        description: currentStep.description,
        image: currentStep.image,
      },
      {
        defaultContent: currentStepContent,
        index: activeStep,
        totalSteps: steps.length,
      },
    ) ??
    currentStepContent;

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

    return null;
  };

  if (!showTour) return null;

  return (
    <CoachContextProvider
      showTour={showTour}
      currentStepSize={getStepSize()}
      onClose={endTour}
      currentStep={currentStep}
      currentStepIndex={activeStep}
      totalSteps={steps.length}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      titleId={titleId}
      setTitleId={setTitleId}
    >
      {renderCurrentStep()}
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
