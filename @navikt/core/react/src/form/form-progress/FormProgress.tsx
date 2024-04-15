import React from "react";
import Button from "../../button/Button";
import { HStack } from "../../layout/stack";
import { BodyShort } from "../../typography";

export interface FormProgressProps {
  activeStep: number; // Liker egentlig bedre "currentStep", men bør matche Stepper.
}

export function FormProgress({ activeStep }: FormProgressProps) {
  const totalSteps = 8; // TODO: Prop eller telle antall Stepper.Step?
  return (
    <div>
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
        <Button type="button" variant="tertiary" size="small">
          SHEVRON Vis alle steg
        </Button>
      </HStack>
      <div>Stepper</div>
    </div>
  );
}

export default FormProgress;
