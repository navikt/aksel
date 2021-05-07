import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/fieldset",
  component: Fieldset,
} as Meta;

const FormElements = () => (
  <>
    <label>input 1 label</label>
    <input />
    <input type="checkbox" />
    <label>box 1</label>
    <input type="checkbox" />
    <label>box 2</label>
    <input type="checkbox" />
    <label>box 3</label>
  </>
);

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset legend="This is the legend">
        <FormElements />
      </Fieldset>
      <h1>Fieldset w/description</h1>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
      >
        <FormElements />
      </Fieldset>
    </div>
  );
};
