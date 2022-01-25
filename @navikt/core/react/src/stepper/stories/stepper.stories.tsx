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
        <h2>Stepper</h2>
        <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
          <Stepper.Step>Start søknad</Stepper.Step>
          <Stepper.Step>Personopplysninger</Stepper.Step>
          <Stepper.Step>Vedlegg</Stepper.Step>
          <Stepper.Step>Oppsumering</Stepper.Step>
          <Stepper.Step>Innsending</Stepper.Step>
        </Stepper>
      </div>
      <div>
        <h2>Stepper w/states</h2>
        <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
          <Stepper.Step finished>Start søknad</Stepper.Step>
          <Stepper.Step disabled>Personopplysninger</Stepper.Step>
          <Stepper.Step disabled finished>
            Vedlegg
          </Stepper.Step>
          <Stepper.Step>Oppsumering</Stepper.Step>
          <Stepper.Step>Innsending</Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
};
