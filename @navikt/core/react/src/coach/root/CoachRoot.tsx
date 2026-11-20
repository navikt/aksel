import React, { useCallback, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import { Portal } from "../../portal";
import Spacer from "../../primitives/stack/Spacer";
import { useClientLayoutEffect } from "../../utils-external";
import { DismissableLayer } from "../../utils/components/dismissablelayer/DismissableLayer";
import { Floating } from "../../utils/components/floating/Floating";
import { getSideAndAlignFromPlacement } from "../../utils/components/floating/Floating.utils";
import { FocusBoundary } from "../../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../../utils/components/focus-guards/FocusGuards";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { useMergeRefs } from "../../utils/hooks";
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
import {
  CoachShowTourTrigger,
  type CoachShowTourTriggerProps,
} from "../trigger/CoachShowTourTrigger";
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
 *   <Coach.ShowTourTrigger>
 *     <Coach.Mark>
 *       <Button>Start tour</Button>
 *     </Coach.Mark>
 *   </Coach.ShowTourTrigger>
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

  const translate = useI18n("Coach", translations);

  const [uncontrolledShowTour, setUncontrolledShowTour] = useState(false);
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [titleId, setTitleId] = useState<string>();
  const [stepElement, setStepElement] = useState<HTMLElement | null>(null);
  const stepRef = useRef<HTMLElement | null>(null);
  const mergedStepRef = useMergeRefs(stepRef, setStepElement);

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
            allowCancelTour: props.allowCancelTour ?? true,
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

  const activeStepIndex = currentStepControlled ?? uncontrolledStep;
  const currentStep = steps[activeStepIndex];
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
    if (!currentStep) {
      consoleWarning(
        `Coach cannot find a step at index ${activeStepIndex} in ${steps.length} steps. Provide a non-empty steps array and a valid currentStep or defaultStep index.`,
      );
    }
  }, [activeStepIndex, currentStep, steps.length]);

  useEffect(() => {
    // Show warning for missing triggers if the tour is active
    if (!showTour || !currentStep) return;
    missingTriggersWarning(
      activeStepIndex,
      steps.length,
      currentStep,
      stepElement,
    );
  }, [showTour, activeStepIndex, steps.length, currentStep, stepElement]);

  useEffect(() => {
    // Warn if the current step is an anchor type but its anchor element is not found
    if (showTour && currentStep?.type === "anchor" && !anchorRef?.current) {
      consoleWarning(
        `Coach step "${currentStep.id}" cannot find its anchor. Attach anchorRef to a mounted element before showing this step.`,
      );
    }
  }, [showTour, currentStep?.type, currentStep?.id, anchorRef]);

  useClientLayoutEffect(() => {
    // Reset uncontrolled step when the tour is hidden
    if (!showTour) {
      setUncontrolledStep(defaultStep);
    }
  }, [defaultStep, showTour]);

  // Get the size and width of the current step, with default values if not specified
  const getStepSize = () => currentStep?.size ?? "medium";
  const getStepWidth = () => currentStep?.width ?? "medium";

  const setStep = useCallback(
    (nextStep: number) => {
      if (currentStepControlled === undefined) {
        setUncontrolledStep(nextStep);
      }
      onStepChange?.(nextStep);
    },
    [currentStepControlled, onStepChange],
  );

  const setShowTour = useCallback(
    (open: boolean) => {
      if (showTourControlled === undefined) {
        setUncontrolledShowTour(open);
      }
      onShowTourChange?.(open);
    },
    [onShowTourChange, showTourControlled],
  );

  const endTour = useCallback(() => setShowTour(false), [setShowTour]);

  const goToNextStep = useCallback(() => {
    if (activeStepIndex === steps.length - 1) {
      endTour();
      return;
    }
    setStep(activeStepIndex + 1);
  }, [activeStepIndex, endTour, setStep, steps.length]);

  const goToPreviousStep = useCallback(() => {
    if (activeStepIndex > 0) {
      setStep(activeStepIndex - 1);
    }
  }, [activeStepIndex, setStep]);

  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    if (currentStep?.allowCancelTour) {
      endTour();
    }
  };

  const handleArrowKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const target = event.target;
    // Let editable content and nested widgets handle their own arrow keys first.
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.nativeEvent.isComposing ||
      (target instanceof HTMLElement && target.isContentEditable) ||
      (target instanceof Element &&
        target.closest(
          'input, textarea, select, [role="textbox"], [role="combobox"]',
        ))
    ) {
      return;
    }

    if (event.key === "ArrowRight" && activeStepIndex < steps.length - 1) {
      event.preventDefault();
      goToNextStep();
    } else if (event.key === "ArrowLeft" && activeStepIndex > 0) {
      event.preventDefault();
      goToPreviousStep();
    }
  };

  const getInitialFocus = useCallback(() => {
    const popup = stepRef.current;
    if (!popup || popup.dataset.coachStepId !== currentStep?.id) {
      return null;
    }

    const nextTriggers = popup.querySelectorAll<HTMLElement>(
      "[data-coach-next-trigger]",
    );
    const closeTriggers = popup.querySelectorAll<HTMLElement>(
      "[data-coach-close-trigger]",
    );

    const trigger =
      nextTriggers[nextTriggers.length - 1] ??
      closeTriggers[closeTriggers.length - 1];

    if (!trigger) return null;

    // Prevent focus from interrupting the smooth scroll to the anchor.
    trigger.focus?.({ preventScroll: true });

    // Returns undefined to override the default focus behavior of the FocusBoundary and Dialog components
    return undefined;
  }, [currentStep?.id]);

  useClientLayoutEffect(() => {
    // Dialog stays mounted between dialog steps, so its initial focus does not rerun.
    if (showTour && currentStep?.type === "dialog") {
      getInitialFocus();
    }
  }, [showTour, currentStep?.type, getInitialFocus, stepElement]);

  // Default content for a step
  const defaultStepContent = (
    <CoachStep>
      <div className="aksel-coach__top-bar">
        <CoachProgress />
        <Spacer />
        {currentStep?.allowCancelTour && (
          <CoachCloseTrigger data-coach-top-close-trigger>
            <Button
              size="small"
              icon={<XMarkIcon title={translate("close")} />}
              variant="tertiary"
              data-color="neutral"
            />
          </CoachCloseTrigger>
        )}
      </div>
      {currentStep?.image && <CoachImage>{currentStep.image}</CoachImage>}
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
    (currentStep &&
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
      )) ??
    defaultStepContent;

  // Render the current step based on its type (dialog or anchor)
  const renderCurrentStep = () => {
    const labelledBy = currentStep?.["aria-labelledby"] ?? titleId;

    if (currentStep?.type === "dialog") {
      return (
        <Dialog
          open={true}
          size={getStepSize()}
          onOpenChange={(_open, event) => {
            if (event instanceof KeyboardEvent) {
              handleEscapeKeyDown(event);
            }
          }}
        >
          <Dialog.Popup
            // Keep focus trapped without locking scroll, so dialog-to-anchor transitions can scroll freely.
            modal="trap-focus"
            withBackdrop
            ref={mergedStepRef}
            data-coach-step-id={currentStep.id}
            initialFocusTo={getInitialFocus}
            onKeyDown={handleArrowKeyDown}
            width={getStepWidth()}
            aria-labelledby={labelledBy}
            closeOnOutsideClick={false}
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
      const [side, align] = getSideAndAlignFromPlacement(
        currentStep.placement ?? "top",
      );

      return (
        <Portal key={currentStep.id}>
          <CoachBackdrop anchorEl={anchorEl} />
          <Floating>
            <Floating.Anchor virtualRef={anchorEl} />
            <FocusGuards>
              <FocusBoundary loop trapped modal initialFocus={getInitialFocus}>
                <DismissableLayer
                  asChild
                  onEscapeKeyDown={handleEscapeKeyDown}
                  safeZone={{ anchor: anchorEl }}
                >
                  <Floating.Content
                    ref={mergedStepRef}
                    data-coach-step-id={currentStep.id}
                    onKeyDown={handleArrowKeyDown}
                    side={side}
                    align={align}
                    sideOffset={currentStep.offset ?? 12}
                    collisionPadding={12}
                    role="dialog"
                    aria-labelledby={labelledBy}
                    className="aksel-coach__anchor"
                  >
                    <div
                      className="aksel-coach__anchor_content"
                      data-coach-step-size={getStepSize()}
                      data-coach-step-width={getStepWidth()}
                    >
                      {stepContent}
                    </div>
                  </Floating.Content>
                </DismissableLayer>
              </FocusBoundary>
            </FocusGuards>
          </Floating>
        </Portal>
      );
    }

    return null;
  };

  return (
    <CoachContextProvider
      showTour={showTour}
      openTour={() => setShowTour(true)}
      disableTour={disableTour}
      currentStepSize={getStepSize()}
      onClose={endTour}
      currentStep={currentStep ?? null}
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
  ShowTourTrigger: CoachShowTourTrigger,
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
  CoachShowTourTrigger,
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
  CoachShowTourTriggerProps,
  CoachProgressProps,
  CoachNextTriggerProps,
  CoachPreviousTriggerProps,
  CoachFooterProps,
  CoachImageProps,
  CoachMarkProps,
};
