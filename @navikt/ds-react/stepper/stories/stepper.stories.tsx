import React, { useState } from "react";
import { Stepper, StepperStep } from "../src/index";

export default {
  title: "@navikt/stepper",
  component: Stepper,
};

export const All = () => {
  const [activeS, setActiveS] = useState(3);
  return (
    <>
      <h1>Stepper horizontal</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "2rem",
        }}
      >
        <Stepper>
          <StepperStep>Step 1</StepperStep>
          <StepperStep>Step 2</StepperStep>
        </Stepper>

        <Stepper onClick={(e) => setActiveS(e.target.value)}>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Step 3Cillum veniam exercitation adipisicing fugiat consectetur
            proident officia.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>
      </div>

      <h1>Stepper vertical</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Stepper orientation="vertical">
          <StepperStep>Step 1</StepperStep>
          <StepperStep>Step 2</StepperStep>
        </Stepper>

        <Stepper onClick={(e) => null} orientation="vertical">
          <StepperStep>Step 1</StepperStep>
          <StepperStep>Step 2</StepperStep>
          <StepperStep>Step 3</StepperStep>
        </Stepper>

        <Stepper orientation="vertical">
          <StepperStep>Step 1</StepperStep>
          <StepperStep>Step 2</StepperStep>
          <StepperStep>
            Step 3 Sint ad exercitation consequat eiusmod nisi eiusmod minim.
            Step 3 Sint ad exercitation consequat eiusmod nisi eiusmod minim.
            Step 3 Sint ad exercitation consequat eiusmod nisi eiusmod minim.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
        </Stepper>
      </div>
    </>
  );
};
