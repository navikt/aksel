import React, { useState } from "react";
import { Stepper } from "..";

export const Example = (props) => {
  const [activeStep, setActiveStep] = useState(
    props.initialStep ? props.initialStep : 1
  );

  return (
    <Stepper {...props} activeStep={activeStep} onStepChange={setActiveStep}>
      <Stepper.Step>Start</Stepper.Step>
      <Stepper.Step>Sunt deserunt qui sit sunt culpa nisi</Stepper.Step>
      <Stepper.Step>Nulla nisi pariatur nulla cupidatat elit.</Stepper.Step>
      <Stepper.Step>
        Nulla laborum proident consequat laborum elit et dolore ut sunt.
      </Stepper.Step>
    </Stepper>
  );
};
