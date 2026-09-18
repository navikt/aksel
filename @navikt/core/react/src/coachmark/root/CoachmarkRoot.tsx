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
import { CoachmarkBackdrop } from "../backdrop/CoachmarkBackdrop";
import {
  CoachmarkContent,
  type CoachmarkContentProps,
} from "../content/CoachmarkContent";
import {
  CoachmarkDescription,
  type CoachmarkDescriptionProps,
} from "../description/CoachmarkDescription";
import { CoachmarkDot, type CoachmarkDotProps } from "../dot/CoachmarkDot";
import {
  CoachmarkFooter,
  type CoachmarkFooterProps,
} from "../footer/CoachmarkFooter";
import {
  CoachmarkImage,
  type CoachmarkImageProps,
} from "../image/CoachmarkImage";
import {
  CoachmarkProgress,
  type CoachmarkProgressProps,
} from "../progress/CoachmarkProgress";
import {
  CoachmarkTitle,
  type CoachmarkTitleProps,
} from "../title/CoachmarkTitle";
import {
  CoachmarkCloseTrigger,
  type CoachmarkCloseTriggerProps,
} from "../trigger/CoachmarkCloseTrigger";
import {
  CoachmarkNextTrigger,
  type CoachmarkNextTriggerProps,
} from "../trigger/CoachmarkNextTrigger";
import {
  CoachmarkPreviousTrigger,
  type CoachmarkPreviousTriggerProps,
} from "../trigger/CoachmarkPreviousTrigger";
import { CoachmarkContextProvider } from "./Coachmark.context";

interface CoachmarkStepTypeBase {
  /**
   * Unique identifier for the coachmark step.
   */
  id: string;
  /**
   * Content within the coachmark step.
   */
  content: React.ReactNode;
  /**
   * Whether the user is allowed to end the tour at this step.
   */
  allowToEndTour?: boolean;
}

type CoachmarkStepType = CoachmarkStepTypeBase &
  (
    | {
        /**
         * Dialog type coachmark step.
         */
        type: "dialog";
      }
    | {
        /**
         * Anchor type coachmark step.
         */
        type: "anchor";
        /**
         * Reference to the anchor element for the anchor type coachmark step.
         */
        anchorRef: React.RefObject<HTMLElement | null>;
        /**
         * Placement of the anchor type coachmark step relative to the anchor element.
         */
        placement?: NonNullable<
          React.ComponentProps<typeof Popover>["placement"]
        >;
        /**
         * Offset of the anchor type coachmark step relative to the anchor element.
         */
        offset?: number;
      }
  );

interface CoachmarkProps {
  /**
   * Steps shown in sequence.
   */
  steps: readonly CoachmarkStepType[];
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
   * Size of the coachmark.
   * @default "medium"
   */
  /**
   * TODO:
   * - Set size here or on each individual step if needed?
   * - What should be default behavior if size is not specified?
   * - For Figma sizes looks like different content the dev/ux puts in
   *
   *
   * - Scroll smoother: focus might run before scrollIntoView
   * - Ask Linda again about padding for different sizes
   * - Tell Linda dialog sizes
   * - Dialog width can be set to px
   * - Add set sizes for anchor popover, like dialog, talk to design about not allowing big content, set sizes are smaller
   * -
   */
  size?: "small" | "medium";
}

/**
 * Guides the user through a sequence of steps, anchored to elements or shown as dialogs.
 *
 * @example
 * ```tsx
 * <Coachmark
 *   steps={[
 *     { type: "dialog", content: "Welcome!" },
 *     { type: "anchor", anchorRef: buttonRef, content: "Start here." },
 *   ]}
 * />
 * ```
 */
const CoachmarkRoot = ({
  steps,
  tourStarted,
  currentStep: currentStepProp,
  defaultStep = 0,
  onStepChange,
  endTour,
}: CoachmarkProps) => {
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  /** TODO:
   * Change tourStarted to tourShow
   * Drop hook
   */

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
    // TODO: What should have focus if no next or close triggers are found?
    /*
     * - Add console.warn if no button
     */
    const nextTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coachmark-next-trigger]",
    );
    const closeTriggers = document.querySelectorAll<HTMLElement>(
      "[data-coachmark-close-trigger]",
    );

    return (
      nextTriggers[nextTriggers.length - 1] ??
      closeTriggers[closeTriggers.length - 1]
    );
  };

  const TopCloseButton = (
    <HStack width="full" justify="end" marginBlock="space-0 space-2">
      <CoachmarkCloseTrigger data-coachmark-top-close-trigger>
        {/* TODO: What to call coachmark in Norwegian? Remove it */}

        <Button
          size="small"
          icon={<XMarkIcon title="Avslutt" />}
          variant="tertiary"
          data-color="neutral"
        />
      </CoachmarkCloseTrigger>
    </HStack>
  );

  const renderCurrentStep = () => {
    if (currentStep?.type === "dialog") {
      return (
        <Dialog open={true}>
          <Dialog.Popup initialFocusTo={getInitialFocus} width="small">
            <Dialog.Body className="aksel-coachmark__dialog-body">
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
          <CoachmarkBackdrop anchorEl={anchorEl} />
          <FocusGuards>
            <FocusBoundary loop trapped modal initialFocus={getInitialFocus}>
              <Popover
                anchorEl={anchorEl}
                open
                onClose={() => {}}
                placement={currentStep.placement}
                offset={currentStep.offset ?? 12}
                role="dialog"
                className="aksel-coachmark__popover"
              >
                <Popover.Content
                  className="aksel-coachmark__popover_content"
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
    <CoachmarkContextProvider
      tourStarted={tourStarted}
      onClose={endTour}
      currentStep={currentStep}
      currentStepIndex={activeStep}
      totalSteps={steps.length}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {renderCurrentStep()}
    </CoachmarkContextProvider>
  );
};

const Coachmark = Object.assign(CoachmarkRoot, {
  Content: CoachmarkContent,
  Title: CoachmarkTitle,
  Description: CoachmarkDescription,
  CloseTrigger: CoachmarkCloseTrigger,
  Progress: CoachmarkProgress,
  NextTrigger: CoachmarkNextTrigger,
  PreviousTrigger: CoachmarkPreviousTrigger,
  Footer: CoachmarkFooter,
  Image: CoachmarkImage,
  Dot: CoachmarkDot,
});

export {
  Coachmark,
  CoachmarkContent,
  CoachmarkTitle,
  CoachmarkDescription,
  CoachmarkCloseTrigger,
  CoachmarkProgress,
  CoachmarkNextTrigger,
  CoachmarkPreviousTrigger,
  CoachmarkFooter,
  CoachmarkImage,
  CoachmarkDot,
};

export type {
  CoachmarkStepType,
  CoachmarkProps,
  CoachmarkContentProps,
  CoachmarkTitleProps,
  CoachmarkDescriptionProps,
  CoachmarkCloseTriggerProps,
  CoachmarkProgressProps,
  CoachmarkNextTriggerProps,
  CoachmarkPreviousTriggerProps,
  CoachmarkFooterProps,
  CoachmarkImageProps,
  CoachmarkDotProps,
};
