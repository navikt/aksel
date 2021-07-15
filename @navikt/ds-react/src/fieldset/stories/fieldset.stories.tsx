import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Checkbox, Input, Radio, Select } from "../../index";
export default {
  title: "ds-react/form/fieldset",
  component: Fieldset,
} as Meta;

const Checkboxes = ({ size = "m" }: { size?: "m" | "s" }) => (
  <>
    <Checkbox error="testerror" size={size} label="box 1" />
    <Checkbox size={size} label="box 2" />
    <Checkbox size={size} label="box 3" />
    <Checkbox size={size} label="box 4" />
  </>
);

const Radios = ({ size = "m" }: { size?: "m" | "s" }) => (
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
);

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>
      <Fieldset type="checkbox" legend="This is the legend">
        <Checkboxes />
      </Fieldset>
      <Fieldset
        type="radio"
        legend="This is the legend"
        description="This is the description"
      >
        <Radios />
      </Fieldset>
      <h1>Fieldset w/description</h1>
      <Fieldset
        type="checkbox"
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes />
      </Fieldset>
      <Fieldset
        type="checkbox"
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
        noErrorProvider
      >
        <Checkboxes />
      </Fieldset>
      <h1>Fieldset small</h1>
      <Fieldset
        type="checkbox"
        size="s"
        legend="This is the legend"
        description="This is the description"
      >
        <Checkboxes size="s" />
      </Fieldset>
      <h1>Fieldset small</h1>
      <Fieldset
        type="radio"
        size="s"
        error="FielsetError"
        legend="This is the legend"
        description="This is the description"
      >
        <Radios size="s" />
      </Fieldset>
      <h1>Fieldset w/error</h1>
      <Fieldset
        type="checkbox"
        legend="This is the legend"
        description="This is the description"
        error="Dette er errormeldingen"
        errorId="123ID"
        noErrorProvider
      >
        <Checkboxes />
        <Radios />
      </Fieldset>

      <Fieldset
        type="checkbox"
        legend="This is the legend"
        description="This is the description"
        error="this is an error"
      >
        <Checkboxes />
      </Fieldset>
      <Fieldset
        legend="This is the legend"
        description="This is the description"
        error="this is an error"
        noErrorProvider
        size="s"
      >
        <Input error="Inputerror" />
        <Select error="selecterror">
          <option value="">Velg land</option>
          <option value="norge">Norge</option>
          <option value="sverige">Sverige</option>
          <option value="danmark">Danmark</option>
        </Select>
      </Fieldset>
    </div>
  );
};
