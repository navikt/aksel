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
        <StepIndicator.Step>1</StepIndicator.Step>
        <StepIndicator.Step>2</StepIndicator.Step>
        <StepIndicator.Step>3</StepIndicator.Step>
      </StepIndicator>
    </div>
  );
};
