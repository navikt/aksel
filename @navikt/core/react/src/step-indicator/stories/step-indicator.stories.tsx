import React from "react";
import StepIndicator from "../StepIndicator";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/step-indicator",
  component: StepIndicator,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <StepIndicator activeStep={1} onStepChange={console.log}>
        <StepIndicator.Step>Steg nr 1</StepIndicator.Step>
        <StepIndicator.Step>Laborum velit eu magna esse</StepIndicator.Step>
        <StepIndicator.Step>test</StepIndicator.Step>
      </StepIndicator>

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
    </div>
  );
};
