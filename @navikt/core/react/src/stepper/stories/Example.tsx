import React, { useState } from "react";
import { Stepper } from "..";

export const Example = ({ ...props }) => {
  const { disabled, ...rest } = props;
  const [activeStep, setActiveStep] = useState(
    rest.initialStep ? rest.initialStep : 1
  );

  return (
    <Stepper {...rest} activeStep={activeStep} onStepChange={setActiveStep}>
      <Stepper.Step>Start</Stepper.Step>
      <Stepper.Step>Sunt deserunt qui sit sunt culpa nisi</Stepper.Step>
      <Stepper.Step disabled={disabled}>
        Nulla nisi pariatur nulla cupidatat elit.
      </Stepper.Step>
      <Stepper.Step>
        Nulla laborum proident consequat laborum elit et dolore ut sunt.
      </Stepper.Step>
    </Stepper>
  );
};
