import React from "react";
import { CheckboxGroup, Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Checkbox, TextField, /* Radio, */ Select } from "../../index";
export default {
  title: "ds-react/form/fieldset",
  component: Fieldset,
} as Meta;

const Checkboxes = () => (
  <CheckboxGroup error="Checkboxgroup-error" legend="Velg språk">
    <Checkbox error="CheckboxErrorMsg">box 1</Checkbox>
    <Checkbox>box 2</Checkbox>
    <Checkbox>box 3</Checkbox>
    <Checkbox>box 4</Checkbox>
  </CheckboxGroup>
);

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset legend="This is the legend">
        <Checkboxes />
      </Fieldset>
      <h2>Fieldset w/description</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset w/error</h2>
      <Fieldset
        error="FieldsetError"
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset small</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset small w/error</h2>
      <Fieldset
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset uten checkbox/radio</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
      >
        <TextField />
      </Fieldset>

      <h2>Fieldset uten checkbox/radion small</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <TextField />
      </Fieldset>
      <h2>Fieldset uten checkbox/radion w/error</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        error="FielsetError"
      >
        <Select>
          <option value="">Velg land</option>
          <option value="norge">Norge</option>
        </Select>
      </Fieldset>
    </div>
  );
};
