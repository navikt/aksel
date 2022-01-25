import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import Stepper from "../Stepper";

export default {
  title: "ds-react/stepper",
  component: Stepper,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Stepper</h1>
      <Stepper>adad</Stepper>
    </div>
  );
};
