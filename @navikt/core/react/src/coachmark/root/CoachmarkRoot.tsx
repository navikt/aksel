import React, { useState } from "react";
import { Dialog } from "../../dialog";
import { Popover } from "../../popover";
import { Portal } from "../../portal";
import { useClientLayoutEffect } from "../../utils-external";
import { FocusBoundary } from "../../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../../utils/components/focus-guards/FocusGuards";
import { CoachmarkBackdrop } from "../backdrop/CoachmarkBachdrop";
import {
  CoachmarkContent,
  type CoachmarkContentProps,
} from "../content/CoachmarkContent";
import { CoachmarkContextProvider } from "../context/Coachmark.context";
import {
  CoachmarkDescription,
  type CoachmarkDescriptionProps,
} from "../description/CoachmarkDescription";
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
   * Called when the active step changes.
   */
  onStepChange?: (step: number) => void;
  /**
   * Called when the tour is dismissed or finished.
   */
  endTour: () => void;
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
  onStepChange,
  endTour,
}: CoachmarkProps) => {
  const [uncontrolledStep, setUncontrolledStep] = useState(0);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const activeStep = uncontrolledStep;
  const currentStep = steps[activeStep];
  const anchorRef =
    currentStep?.type === "anchor" ? currentStep.anchorRef : undefined;

  useClientLayoutEffect(() => {
    setAnchorEl(anchorRef?.current ?? null);
  }, [anchorRef, tourStarted, activeStep]);

  useClientLayoutEffect(() => {
    if (!tourStarted) {
      setUncontrolledStep(0);
    }
  }, [tourStarted]);

  const setStep = (nextStep: number) => {
    setUncontrolledStep(nextStep);
    onStepChange?.(nextStep);
  };

  const goToNextStep = () => {
    if (activeStep === steps.length - 1) {
      endTour();
      return;
    }
    setStep(activeStep + 1);
  };

  const renderCurrentStep = () => {
    if (currentStep?.type === "dialog") {
      return (
        <Dialog open={true}>
          <Dialog.Popup>
            <Dialog.Body>{currentStep.content}</Dialog.Body>
          </Dialog.Popup>
        </Dialog>
      );
    }

    if (currentStep?.type === "anchor" && anchorEl) {
      console.info(anchorEl.getBoundingClientRect());
      return (
        <Portal>
          <CoachmarkBackdrop anchorEl={anchorEl} />
          <FocusGuards>
            <FocusBoundary loop trapped modal>
              <Popover
                anchorEl={anchorEl}
                open
                onClose={() => {}}
                placement={currentStep.placement}
                offset={currentStep.offset}
                role="dialog"
                className="aksel-coachmark__popover"
              >
                <Popover.Content className="aksel-coachmark__popover_content">
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
      goToPreviousStep={() => setStep(activeStep - 1)}
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
};
