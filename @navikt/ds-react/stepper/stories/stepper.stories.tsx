import React, { useState } from "react";
import { Stepper, StepperStep } from "../src/index";

export default {
  title: "@navikt/stepper",
  component: Stepper,
};

export const All = () => {
  return (
    <>
      <h1>Stepper horizontal</h1>
      <Stepper>
        <StepperStep>Step 1</StepperStep>
        <StepperStep>Step 2</StepperStep>
      </Stepper>

      <h1>Stepper vertical</h1>
      <Stepper orientation="vertical">
        <StepperStep>Step 1</StepperStep>
        <StepperStep>Step 2</StepperStep>
      </Stepper>
    </>
  );
};
