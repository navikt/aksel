import React, { useState } from "react";
import Stepper from "../src/index";

export default {
  title: "@navikt/stepper",
  component: Stepper,
};

export const All = () => {
  return (
    <>
      <h1>Stepper</h1>
      <Stepper>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
      </Stepper>
    </>
  );
};
