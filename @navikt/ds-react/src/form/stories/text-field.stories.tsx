import React from "react";
import { TextField } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Fieldset } from "../..";
export default {
  title: "ds-react/form/text-field",
  component: TextField,
} as Meta;

export const All = () => {
  return (
    <div>
      <TextField label="Textfield" />
      <br />
      <TextField label="Textfield" size="s" />
      <br />
      <TextField label="Label for input" />
      <br />
      <TextField label="Label for input" description="description for label" />
      <br />
      <TextField
        size="s"
        label="Label for input"
        description="description for label"
      />
      <br />
      <TextField
        size="s"
        label="Label for input"
        description="description for label"
        error="Error message"
      />
      <Fieldset legend="TextField test" error="errormessag fieldset">
        <TextField label="Textfield" error="Error message" />
        <TextField label="Textfield" />
      </Fieldset>

      <Fieldset disabled legend="TextField test" error="errormessag fieldset">
        <TextField label="Textfield" error="Error message" />
      </Fieldset>
      <Fieldset
        description="fieldsetDescription"
        error="fieldsetError"
        legend="TextField test"
      >
        <TextField
          label="Textfield"
          description="textfieldDescription"
          error="Error message"
        />
      </Fieldset>

      <TextField
        label="Textfield"
        description="textfieldDescription"
        hideLabel
      />
    </div>
  );
};
