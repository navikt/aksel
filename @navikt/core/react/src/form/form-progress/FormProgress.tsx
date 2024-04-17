import cl from "clsx";
import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import Button from "../../button/Button";
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
    });

    return (
      <div
        ref={ref}
        className={cl(className, { "navds-form-progress--open": _open })}
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
        <HStack justify="space-between" align="center">
          <BodyShort as="span">
            Steg {activeStep} av {totalSteps}
          </BodyShort>
          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="navds-form-progress__button"
            onClick={() => _setOpen((x) => !x)}
            aria-expanded={_open}
          >
            <ChevronDownIcon
              className="navds-form-progress__expand-icon"
              aria-hidden
            />
            {_open ? "Skjul alle steg" : "Vis alle steg"}
          </Button>
        </HStack>
        <div className="navds-form-progress__stepper">
          <Stepper
            activeStep={activeStep}
            onStepChange={onStepChange}
            interactive={interactiveSteps}
          >
            {children}
          </Stepper>
        </div>
      </div>
    );
  },
) as FormProgressComponent;

FormProgress.Step = FormProgressStep;

export default FormProgress;
