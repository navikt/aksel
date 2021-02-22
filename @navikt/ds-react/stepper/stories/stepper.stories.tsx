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
  },
  {
    label: "Step 2",
    link: "step2",
  },
  {
    label: "Do cupidatat aliqua quis non id deserunt labore officia elit.",
    link: "step3",
  },
  {
    label: "Step 4",
    disabled: true,
    link: "step4",
  },
  {
    label: "Step 5",
    link: "step5",
  },
];

export const StaticStepper = () => (
  <Stepper activeStep={0}>
    {steps.map(({ label }, index) => (
      <StepperStep>{label}</StepperStep>
    ))}
  </Stepper>
);

export const StepperButton = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
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
  );
};

export const StepperLink = () => {
  const location = useLocation();

  return (
    <Stepper activeStep={steps.findIndex(({ link }) => link === location)}>
      {steps.map(({ label, link }) => (
        <StepperStep component={Link} to={link}>
          {label}
        </StepperStep>
      ))}
    </Stepper>
  );
};

StepperLink.decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
