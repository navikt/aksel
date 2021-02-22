import React, { useState } from "react";
import { Stepper, StepperStep } from "../src/index";
import { HashRouter as Router, Link, useLocation } from "react-router-dom";

export default {
  title: "@navikt/stepper",
  component: Stepper,
};

const steps = [
  {
    label: "Step 1",
    link: "step1",
    status: "done",
  },
  {
    label: "Step 2",
    link: "step2",
    status: "done",
  },
  {
    label: "Do cupidatat aliqua quis non id deserunt labore officia elit.",
    link: "step3",
    status: "warning",
  },
  {
    label: "Step 4",
    disabled: true,
    link: "step4",
    status: "inProgress",
  },
  {
    label: "Step 5",
    link: "step5",
    status: "none",
  },
];

export const StaticStepper = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      rowGap: "2rem",
    }}
  >
    <Stepper activeStep={0}>
      {steps.map(({ label }, index) => (
        <StepperStep>{label}</StepperStep>
      ))}
    </Stepper>

    <Stepper activeStep={0}>
      {steps.map(({ label, status }, index) => (
        <StepperStep status={status as any}>{label}</StepperStep>
      ))}
    </Stepper>

    <Stepper activeStep={0} colorful>
      {steps.map(({ label, status }, index) => (
        <StepperStep status={status as any}>{label}</StepperStep>
      ))}
    </Stepper>
  </div>
);

export const StepperButton = () => {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        rowGap: "2rem",
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, disabled }, index) => (
          <StepperStep
            component="button"
            onClick={() => setActiveStep(index)}
            disabled={!!disabled}
          >
            {label}
          </StepperStep>
        ))}
      </Stepper>

      <Stepper activeStep={activeStep}>
        {steps.map(({ label, disabled, status }, index) => (
          <StepperStep
            status={status as any}
            component="button"
            onClick={() => setActiveStep(index)}
            disabled={!!disabled}
          >
            {label}
          </StepperStep>
        ))}
      </Stepper>

      <Stepper activeStep={activeStep} colorful>
        {steps.map(({ label, disabled, status }, index) => (
          <StepperStep
            status={status as any}
            component="button"
            onClick={() => setActiveStep(index)}
            disabled={!!disabled}
          >
            {label}
          </StepperStep>
        ))}
      </Stepper>
    </div>
  );
};

export const StepperLink = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        rowGap: "2rem",
      }}
    >
      <Stepper
        activeStep={steps.findIndex(
          ({ link }) => link === location.pathname.substring(1)
        )}
      >
        {steps.map(({ label, link }) => (
          <StepperStep component={Link} to={link}>
            {label}
          </StepperStep>
        ))}
      </Stepper>
      <Stepper
        activeStep={steps.findIndex(
          ({ link }) => link === location.pathname.substring(1)
        )}
      >
        {steps.map(({ label, link, status }) => (
          <StepperStep status={status as any} component={Link} to={link}>
            {label}
          </StepperStep>
        ))}
      </Stepper>
      <Stepper
        colorful
        activeStep={steps.findIndex(
          ({ link }) => link === location.pathname.substring(1)
        )}
      >
        {steps.map(({ label, link, status }) => (
          <StepperStep status={status as any} component={Link} to={link}>
            {label}
          </StepperStep>
        ))}
      </Stepper>
    </div>
  );
};

StepperLink.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
