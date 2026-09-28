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
import { CoachBackdrop } from "../backdrop/CoachBackdrop";
import { CoachContent, type CoachContentProps } from "../content/CoachContent";
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
import { CoachContextProvider } from "./Coach.context";

interface CoachStepTypeBase {
  /**
   * Unique identifier for the coach step.
   */
  id: string;
  /**
   * Content within the coach step.
   */
  content: React.ReactNode;
  /**
   * Whether the user is allowed to end the tour at this step.
   */
  allowToEndTour?: boolean;
}

type CoachStepType = CoachStepTypeBase &
  (
    | {
        /**
         * Dialog type coach step.
         */
        type: "dialog";
      }
    | {
        /**
         * Anchor type coach step.
         */
        type: "anchor";
        /**
         * Reference to the anchor element for the anchor type coach step.
         */
        anchorRef: React.RefObject<HTMLElement | null>;
        /**
         * Placement of the anchor type coach step relative to the anchor element.
         */
        placement?: NonNullable<
          React.ComponentProps<typeof Popover>["placement"]
        >;
        /**
         * Offset of the anchor type coach step relative to the anchor element.
         */
        offset?: number;
      }
  );

interface CoachProps {
  /**
   * Steps shown in sequence.
   */
  steps: readonly CoachStepType[];
  /**
   * Whether the tour is visible.
   */
  tourStarted: boolean;
  /**
   * Active step index when controlled.
   */
  currentStep?: number;
  /**
   * Initial active step index when uncontrolled.
   * @default 0
   */
  defaultStep?: number;
  /**
   * Called when the active step changes.
   */
  onStepChange?: (step: number) => void;
  /**
   * Called when the tour is dismissed or finished.
   */
  endTour: () => void;
  /**
   * Size of the coach.
   * @default "medium"
   */
  size?: "small" | "medium";
}

/**
 * Guides the user through a sequence of steps, anchored to elements or shown as dialogs.
 *
 * @example
 * ```tsx
 * <Coach
 *   steps={[
 *     { type: "dialog", content: "Welcome!" },
 *     { type: "anchor", anchorRef: buttonRef, content: "Start here." },
 *   ]}
 * />
 * ```
 */
const CoachRoot = ({
  steps,
  tourStarted,
  currentStep: currentStepProp,
  defaultStep = 0,
  onStepChange,
  endTour,
}: CoachProps) => {
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const activeStep = currentStepProp ?? uncontrolledStep;
  const currentStep = steps[activeStep];
  const anchorRef =
    currentStep?.type === "anchor" ? currentStep.anchorRef : undefined;

  useClientLayoutEffect(() => {
    const nextAnchorEl = anchorRef?.current ?? null;

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
          behavior: "smooth",
        });
      }
    }

    setAnchorEl(nextAnchorEl);
  }, [anchorRef, tourStarted, activeStep]);

  useClientLayoutEffect(() => {
    if (!tourStarted) {
      setUncontrolledStep(defaultStep);
    }
  }, [defaultStep, tourStarted]);

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
    if (!tourStarted) {
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
    tourStarted,
    steps.length,
  ]);

  const getInitialFocus = () => {
    const nextTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coach-next-trigger]",
    );
    const closeTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coach-close-trigger]",
    );

    return (
      nextTriggers[nextTriggers.length - 1] ??
      closeTriggers[closeTriggers.length - 1]
    );
  };

  const TopCloseButton = (
    <HStack width="full" justify="end" marginBlock="space-0 space-2">
      <CoachCloseTrigger data-coach-top-close-trigger>
        <Button
          size="small"
          icon={<XMarkIcon title="Avslutt" />}
          variant="tertiary"
          data-color="neutral"
        />
      </CoachCloseTrigger>
    </HStack>
  );

  const renderCurrentStep = () => {
    if (currentStep?.type === "dialog") {
      return (
        <Dialog open={true}>
          <Dialog.Popup initialFocusTo={getInitialFocus} width="small">
            <Dialog.Body className="aksel-coach__dialog-body">
              {currentStep.allowToEndTour && TopCloseButton}
              {currentStep.content}
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
                anchorEl={anchorEl}
                open
                onClose={() => {}}
                placement={currentStep.placement}
                offset={currentStep.offset ?? 12}
                role="dialog"
                className="aksel-coach__popover"
              >
                <Popover.Content
                  className="aksel-coach__popover_content"
                  data-top-close-button={currentStep.allowToEndTour ?? false}
                >
                  {currentStep.allowToEndTour && TopCloseButton}
                  {currentStep.content}
                </Popover.Content>
              </Popover>
            </FocusBoundary>
          </FocusGuards>
        </Portal>
      );
    }

    return null;
  };

  if (!tourStarted) return null;

  return (
    <CoachContextProvider
      tourStarted={tourStarted}
      onClose={endTour}
      currentStep={currentStep}
      currentStepIndex={activeStep}
      totalSteps={steps.length}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {renderCurrentStep()}
    </CoachContextProvider>
  );
};

const Coach = Object.assign(CoachRoot, {
  Content: CoachContent,
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
  CoachContent,
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
  CoachStepType,
  CoachProps,
  CoachContentProps,
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
