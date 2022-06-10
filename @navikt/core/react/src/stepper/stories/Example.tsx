import React, { useState } from "react";
import { Stepper } from "..";

export const Example = (props) => {
  const [activeStep, setActiveStep] = useState(
    props.initialStep ? props.initialStep : 1
  );

  const { as = "a" } = props;
  return (
    <Stepper {...props} activeStep={activeStep} onStepChange={setActiveStep}>
      <Stepper.Step as={as} href="" onClick={(e) => e.preventDefault()}>
        Start
      </Stepper.Step>
      <Stepper.Step as={as} href="" onClick={(e) => e.preventDefault()}>
        Sunt deserunt qui sit sunt culpa nisi
      </Stepper.Step>
      <Stepper.Step as={as} href="" onClick={(e) => e.preventDefault()}>
        Nulla nisi pariatur nulla cupidatat elit.
      </Stepper.Step>
      <Stepper.Step as={as} href="" onClick={(e) => e.preventDefault()}>
        Nulla laborum proident consequat laborum elit et dolore ut sunt.
      </Stepper.Step>
    </Stepper>
  );
};
