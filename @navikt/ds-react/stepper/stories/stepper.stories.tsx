import React, { useState } from "react";
import { Stepper, StepperStep } from "../src/index";
import { HashRouter as Router, Link, useLocation } from "react-router-dom";
import { uuid } from "../../util/src";

export default {
  title: "@navikt/stepper",
  component: Stepper,
};

const steps = [
  {
    label: "Step 1",
    link: "step1",
    status: "finished",
  },
  {
    label: "Step 2",
    link: "step2",
    status: "finished",
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
    label: "Do cupidatat aliqua quis non id deserunt labore officia elit.",
    link: "step5",
    status: "inProgress",
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
    <Stepper activeStep={0} arrow>
      {steps.map(({ label }, index) => (
        <StepperStep key={uuid()}>{label}</StepperStep>
      ))}
    </Stepper>

    <Stepper activeStep={3} arrow>
      {steps.map(({ label, status }, index) => (
        <StepperStep key={uuid()} status={status as any}>
          {label}
        </StepperStep>
      ))}
    </Stepper>

    <Stepper activeStep={3} colorful arrow>
      {steps.map(({ label, status }, index) => (
        <StepperStep key={uuid()} status={status as any}>
          {label}
        </StepperStep>
      ))}
    </Stepper>

    <Stepper activeStep={3} colorful arrow>
      {steps.map(({ label, status }, index) => (
        <StepperStep key={uuid()} status={status as any}>
          {label}
        </StepperStep>
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
            key={uuid()}
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
            key={uuid()}
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
            key={uuid()}
            status={status as any}
            component="button"
            onClick={() => setActiveStep(index)}
            disabled={!!disabled}
          >
            {label}
          </StepperStep>
        ))}
      </Stepper>

      <Stepper activeStep={activeStep} colorful arrow>
        {steps.map(({ label, disabled, status }, index) => (
          <StepperStep
            key={uuid()}
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
          <StepperStep key={uuid()} component={Link} to={link}>
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
          <StepperStep
            key={uuid()}
            status={status as any}
            component={Link}
            to={link}
          >
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
          <StepperStep
            key={uuid()}
            status={status as any}
            component={Link}
            to={link}
          >
            {label}
          </StepperStep>
        ))}
      </Stepper>

      <Stepper
        arrow
        colorful
        activeStep={steps.findIndex(
          ({ link }) => link === location.pathname.substring(1)
        )}
      >
        {steps.map(({ label, link, status }) => (
          <StepperStep
            key={uuid()}
            status={status as any}
            component={Link}
            to={link}
          >
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
