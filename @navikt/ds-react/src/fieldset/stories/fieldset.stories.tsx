import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Checkbox, Input, Radio, Select } from "../../index";
export default {
  title: "ds-react/form/fieldset",
  component: Fieldset,
} as Meta;

const Checkboxes = ({ size }: { size?: "m" | "s" }) => (
  <>
    <Checkbox size={size} label="box 1" />
    <Checkbox size={size} label="box 2" />
    <Checkbox size={size} label="box 3" />
    <Checkbox size={size} label="box 4" />
  </>
);

/* const Radios = ({ size }: { size?: "m" | "s" }) => (
  <>
    <Radio size={size} name="test" label="DoloreIn quis consectetur." />
    <Radio
      size={size}
      name="test"
      label="Dolore Lorem amet sunt exercitation."
      error="testerror radio"
    />
    <Radio size={size} name="test" label="Dolore Lorem" />
  </>
); */

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset type="checkbox" legend="This is the legend">
        <Checkboxes />
      </Fieldset>
      <h2>Fieldset w/description</h2>
      <Fieldset
        type="checkbox"
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset w/error</h2>
      <Fieldset
        type="checkbox"
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset small</h2>
      <Fieldset
        type="checkbox"
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset small w/error</h2>
      <Fieldset
        type="checkbox"
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <Checkboxes />
      </Fieldset>

      <h2>Fieldset uten checkbox/radion</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
      >
        <Input />
      </Fieldset>

      <h2>Fieldset uten checkbox/radion small</h2>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        size="s"
      >
        <Input />
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
