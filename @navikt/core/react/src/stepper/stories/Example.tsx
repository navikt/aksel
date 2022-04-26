import React, { useState } from "react";
import { Stepper } from "..";

export const Example = (props) => {
  const [activeStep, setActiveStep] = useState(
    props.initialStep ? props.initialStep : 1
  );

  const anchorProps = {
    href: "",
    onClick: (e) => e.preventDefault(),
  };

  return (
    <Stepper {...props} activeStep={activeStep} onStepChange={setActiveStep}>
      <Stepper.Step {...anchorProps}>Start</Stepper.Step>
      <Stepper.Step {...anchorProps}>
        Sunt deserunt qui sit sunt culpa nisi
      </Stepper.Step>
      <Stepper.Step {...anchorProps}>
        Nulla nisi pariatur nulla cupidatat elit.
      </Stepper.Step>
      <Stepper.Step {...anchorProps}>
        Nulla laborum proident consequat laborum elit et dolore ut sunt.
      </Stepper.Step>
    </Stepper>
  );
};
