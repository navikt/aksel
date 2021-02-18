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
          <StepperStep>Step 3</StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper onClick={(e) => setActiveS(e.target.value)}>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper colorful onClick={(e) => setActiveS(e.target.value)}>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper dot>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper dot onClick={(e) => setActiveS(e.target.value)}>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
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
          <StepperStep>Step 3</StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <div style={{ maxWidth: "300px" }}>
          <Stepper orientation="vertical">
            <StepperStep status="done">Step 1</StepperStep>
            <StepperStep status="warning">Step 2</StepperStep>
            <StepperStep status="inProgress">
              Do cupidatat aliqua quis non id deserunt labore officia elit.
            </StepperStep>
            <StepperStep>Step 4</StepperStep>
            <StepperStep>Step 5</StepperStep>
          </Stepper>
        </div>

        <Stepper
          orientation="vertical"
          onClick={(e) => setActiveS(e.target.value)}
        >
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper
          orientation="vertical"
          colorful
          onClick={(e) => setActiveS(e.target.value)}
        >
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper orientation="vertical" dot>
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>

        <Stepper
          orientation="vertical"
          dot
          onClick={(e) => setActiveS(e.target.value)}
        >
          <StepperStep status="done">Step 1</StepperStep>
          <StepperStep status="warning">Step 2</StepperStep>
          <StepperStep status="inProgress">
            Do cupidatat aliqua quis non id deserunt labore officia elit.
          </StepperStep>
          <StepperStep>Step 4</StepperStep>
          <StepperStep>Step 5</StepperStep>
        </Stepper>
      </div>
    </>
  );
};
