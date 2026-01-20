import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import Button from "../../button/Button";
import Collapsible from "../../collapsible/Collapsible";
import { HStack } from "../../layout/stack";
import { ProgressBar } from "../../progress-bar";
import { Stepper, StepperStepProps } from "../../stepper";
import { BodyShort } from "../../typography";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { ComponentTranslation } from "../../utils/i18n/i18n.types";

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
  /**
   * i18n API for customizing texts and labels.
   */
  translations?: ComponentTranslation<"FormProgress">;
}

export type FormProgressStepProps = StepperStepProps;

interface FormProgressComponent
  extends React.ForwardRefExoticComponent<
    FormProgressProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * To be used inside `<FormProgress>`.
   */
  Step: typeof Stepper.Step;
}

/**
 * Component for visualizing progression in a form with multiple steps.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/formprogress)
 * @see 🏷️ {@link FormProgressProps}
 *
 * @example
 * <FormProgress activeStep={2} totalSteps={3}>
 *   <FormProgress.Step completed href="#">Children</FormProgress.Step>
 *   <FormProgress.Step href="#">Personal information</FormProgress.Step>
 *   <FormProgress.Step interactive={false}>Summary</FormProgress.Step>
 * </FormProgress>
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
      translations,
      ...rest
    }: FormProgressProps,
    ref,
  ) => {
    const translate = useI18n("FormProgress", translations);

    return (
      <div ref={ref} {...rest}>
        <ProgressBar
          aria-hidden
          value={activeStep}
          valueMax={totalSteps}
          className="aksel-form-progress__bar"
        />

        <Collapsible lazy open={open} onOpenChange={onOpenChange}>
          <HStack justify="space-between" align="center">
            <BodyShort as="span">
              {translate("step", { activeStep, totalSteps })}
            </BodyShort>
            <Collapsible.Trigger asChild aria-expanded={undefined}>
              <Button
                variant="tertiary"
                size="small"
                className="aksel-form-progress__button"
                icon={<ChevronDownIcon aria-hidden />}
              >
                <span className="aksel-form-progress__btn-txt-hide">
                  {translate("hideAllSteps")}
                </span>
                <span className="aksel-form-progress__btn-txt-show">
                  {translate("showAllSteps")}
                </span>
              </Button>
            </Collapsible.Trigger>
          </HStack>

          <Collapsible.Content className="aksel-form-progress__collapsible">
            <div className="aksel-form-progress__collapsible-content">
              <div className="aksel-form-progress__stepper">
                <Stepper
                  activeStep={activeStep}
                  onStepChange={onStepChange}
                  interactive={interactiveSteps}
                >
                  {children}
                </Stepper>
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  },
) as FormProgressComponent;

FormProgress.Step = Stepper.Step;

export const FormProgressStep = Stepper.Step;

export default FormProgress;
