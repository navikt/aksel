import cl from "clsx";
import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import Button from "../../button/Button";
import Collapsible from "../../collapsible/Collapsible";
import { HStack } from "../../layout/stack";
import { Stepper } from "../../stepper";
import { BodyShort } from "../../typography";
import { useControllableState } from "../../util/hooks/useControllableState";
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
 * TODO DESC
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
      className,
      ...rest
    }: FormProgressProps,
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: false,
      value: open,
      onChange: onOpenChange,
    }); // TODO: Blir dobbelt opp med state nå (pga. Collapsible). Bør Collapsible bare være controlled? Ev. vise riktig tekst med CSS.

    return (
      <div
        ref={ref}
        className={cl(className, "navds-form-progress")} // TODO: Vurder om dette klassenavnet trengs
        {...rest}
      >
        <div>
          <progress
            value={activeStep}
            max={totalSteps}
            style={{ width: "100%" }}
            // TODO: Bruk ProgressBar når merged
          />
        </div>
        <Collapsible open={_open} onOpenChange={_setOpen}>
          <HStack justify="space-between" align="center">
            <BodyShort as="span">
              Steg {activeStep} av {totalSteps}
            </BodyShort>
            <Collapsible.Trigger asChild>
              <Button
                variant="tertiary"
                size="small"
                className="navds-form-progress__button"
                icon={<ChevronDownIcon aria-hidden />}
              >
                {_open ? "Skjul alle steg" : "Vis alle steg"}
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
