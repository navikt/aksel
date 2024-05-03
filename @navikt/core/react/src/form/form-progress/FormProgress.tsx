import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import Button from "../../button/Button";
import Collapsible from "../../collapsible/Collapsible";
import { HStack } from "../../layout/stack";
import { ProgressBar } from "../../progress-bar";
import { Stepper } from "../../stepper";
import { BodyShort } from "../../typography";
import FormProgressStep from "./FormProgressStep";

export interface FormProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of steps.
   */
  totalSteps: number;
  /**
   * Current active step.
   *
   * Index starts at 1, not 0.
   */
  activeStep: number;
  /**
   * Shows Stepper if `true`, hides if `false`.
   * Using this prop removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * Callback for current open-state
   */
  onOpenChange?: (open: boolean) => void;

  // TODO: Bør vel kunne endre tekstene?

  /**
   * Should contain <FormProgress.Step> elements.
   */
  children: React.ReactNode;
  /**
   * Callback for next `activeStep`.
   *
   * Index starts at 1, not 0.
   */
  onStepChange?: (step: number) => void;
  /**
   * Makes Stepper non-interactive if false.
   * @default true
   */
  interactiveSteps?: boolean;
}

interface FormProgressComponent
  extends React.ForwardRefExoticComponent<
    FormProgressProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * To be used inside `<FormProgress>`.
   */
  Step: typeof FormProgressStep;
}

/**
 * Component for visualizing progression in a form with multiple steps.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/formprogress)
 * @see 🏷️ {@link FormProgressProps}
 *
 * @example
 * TODO
 */
export const FormProgress = forwardRef<HTMLDivElement, FormProgressProps>(
  (
    {
      totalSteps,
      activeStep,
      open,
      onOpenChange,
      children,
      onStepChange,
      interactiveSteps,
      ...rest
    }: FormProgressProps,
    ref,
  ) => {
    return (
      <div ref={ref} {...rest}>
        <ProgressBar
          aria-label="Fremdrift" // TODO vurder
          //aria-hidden
          value={activeStep}
          valueMax={totalSteps}
          className="navds-form-progress__bar"
        />
        <Collapsible open={open} onOpenChange={onOpenChange}>
          <HStack justify="space-between" align="center">
            <BodyShort as="span">
              {`Steg ${activeStep} av ${totalSteps}`}
            </BodyShort>
            <Collapsible.Trigger asChild>
              <Button
                variant="tertiary"
                size="small"
                className="navds-form-progress__button"
                icon={<ChevronDownIcon aria-hidden />}
              >
                <span className="navds-form-progress__btn-txt-hide">
                  Skjul alle steg
                </span>
                <span className="navds-form-progress__btn-txt-show">
                  Vis alle steg
                </span>
              </Button>
            </Collapsible.Trigger>
          </HStack>
          <Collapsible.Content className="navds-form-progress__stepper">
            <Stepper
              activeStep={activeStep}
              onStepChange={onStepChange}
              interactive={interactiveSteps}
            >
              {children}
            </Stepper>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  },
) as FormProgressComponent;

FormProgress.Step = FormProgressStep;

export default FormProgress;
