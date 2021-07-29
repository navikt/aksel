import React from "react";
import { TextInput } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Fieldset } from "../..";
export default {
  title: "ds-react/form/text-input",
  component: TextInput,
} as Meta;

export const All = () => {
  return (
    <div>
      <TextInput />
      <br />
      <TextInput size="s" />
      <br />
      <TextInput label="Label for input" />
      <br />
      <TextInput label="Label for input" description="description for label" />
      <br />
      <TextInput
        size="s"
        label="Label for input"
        description="description for label"
      />
      <br />
      <TextInput
        size="s"
        label="Label for input"
        description="description for label"
        error="Error message"
      />
      <Fieldset legend="TextInput test" error="errormessag fieldset">
        <TextInput error="Error message" />
        <TextInput />
      </Fieldset>
    </div>
  );
};
