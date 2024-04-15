import cl from "clsx";
import React from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import Button from "../../button/Button";
import { HStack } from "../../layout/stack";
import { BodyShort } from "../../typography";
import { useControllableState } from "../../util/hooks/useControllableState";

export interface FormProgressProps {
  activeStep: number; // Liker egentlig bedre "currentStep", men bør matche Stepper.

  /**
   * Shows Stepper if `true`, hides if `false`.
   * Using this prop removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * Callback for current open-state
   */
  onOpenChange?: (open: boolean) => void;
}

export function FormProgress({
  activeStep,
  open,
  onOpenChange,
}: FormProgressProps) {
  const totalSteps = 8; // TODO: Prop eller telle antall Stepper.Step?

  const [_open, _setOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  });

  return (
    <div
      className={cl(
        //className,
        { "navds-form-progress--open": _open },
      )}
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
      <div className="navds-form-progress__stepper">Stepper</div>
    </div>
  );
}

export default FormProgress;
