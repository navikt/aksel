import React, { useState } from "react";
import { StepIndicator } from "..";

export const Example = ({ ...props }) => {
  const [active, setactive] = useState(1);

  const { disabled, ...rest } = props;

  return (
    <StepIndicator {...rest} activeStep={active} onStepChange={setactive}>
      <StepIndicator.Step>Start</StepIndicator.Step>
      <StepIndicator.Step>
        Sunt deserunt qui sit sunt culpa nisi
      </StepIndicator.Step>
      <StepIndicator.Step disabled={disabled}>
        Nulla nisi pariatur nulla cupidatat elit.
      </StepIndicator.Step>
      <StepIndicator.Step>
        Nulla laborum proident consequat laborum elit et dolore ut sunt.
      </StepIndicator.Step>
    </StepIndicator>
  );
};
