import React, { useState } from "react";
import StepIndicator from "../StepIndicator";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/step-indicator",
  component: StepIndicator,
} as Meta;

export const All = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div>
      <StepIndicator activeStep={1} onStepChange={console.log}>
        <StepIndicator.Step>Steg nr 1</StepIndicator.Step>
        <StepIndicator.Step>Laborum velit eu magna esse</StepIndicator.Step>
        <StepIndicator.Step>test</StepIndicator.Step>
      </StepIndicator>
      <br />

      <StepIndicator activeStep={1} onStepChange={console.log}>
        <StepIndicator.Step href="#" as="a">
          1
        </StepIndicator.Step>
        <StepIndicator.Step href="#" as="a">
          2
        </StepIndicator.Step>
        <StepIndicator.Step href="#" as="a">
          3
        </StepIndicator.Step>
      </StepIndicator>
      <br />
      <StepIndicator activeStep={activeStep} onStepChange={setActiveStep}>
        <StepIndicator.Step disabled>
          Pariatur pariatur adipisicing reprehenderit ad occaecat reprehenderit
          ut dolore.
        </StepIndicator.Step>
        <StepIndicator.Step>Laborum velit eu magna esse</StepIndicator.Step>
        <StepIndicator.Step disabled>
          Cupidatat Lorem do nostrud ut eu.
        </StepIndicator.Step>
        <StepIndicator.Step>test</StepIndicator.Step>
        <StepIndicator.Step>
          Voluptate pariatur ut est voluptate elit officia excepteur laborum.
        </StepIndicator.Step>
      </StepIndicator>
      <br />
      <StepIndicator
        activeStep={activeStep}
        onStepChange={setActiveStep}
        hideLabels
      >
        <StepIndicator.Step>
          Pariatur pariatur adipisicing reprehenderit ad occaecat reprehenderit
          ut dolore.
        </StepIndicator.Step>
        <StepIndicator.Step>Laborum velit eu magna esse</StepIndicator.Step>
        <StepIndicator.Step disabled>
          Cupidatat Lorem do nostrud ut eu.
        </StepIndicator.Step>
        <StepIndicator.Step>test</StepIndicator.Step>
        <StepIndicator.Step>
          Voluptate pariatur ut est voluptate elit officia excepteur laborum.
        </StepIndicator.Step>
      </StepIndicator>
    </div>
  );
};
