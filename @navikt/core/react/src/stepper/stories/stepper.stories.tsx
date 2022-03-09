import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import Stepper from "../Stepper";

export default {
  title: "ds-react/stepper",
  component: Stepper,
} as Meta;

export const All = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div style={{ display: "flex", gap: "10rem" }}>
      <div>
        <h2 id="stepper-heading">Stepper</h2>
        <Stepper
          aria-labelledby="stepper-heading"
          activeStep={activeStep}
          onStepChange={setActiveStep}
        >
          <Stepper.Step>Start søknad</Stepper.Step>
          <Stepper.Step>Personopplysninger</Stepper.Step>
          <Stepper.Step>Vedlegg</Stepper.Step>
          <Stepper.Step>Oppsumering</Stepper.Step>
          <Stepper.Step>Innsending</Stepper.Step>
        </Stepper>
      </div>
      <div>
        <h2 id="stepper-states-heading">Stepper w/states</h2>
        <Stepper
          aria-labelledby="stepper-states-heading"
          activeStep={activeStep}
          onStepChange={setActiveStep}
        >
          <Stepper.Step>Start søknad</Stepper.Step>
          <Stepper.Step>Personopplysninger</Stepper.Step>
          <Stepper.Step>Vedlegg</Stepper.Step>
          <Stepper.Step>Oppsumering</Stepper.Step>
          <Stepper.Step>Innsending</Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
};
