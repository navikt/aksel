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
      <TextField />
      <br />
      <TextField size="s" />
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
        <TextField error="Error message" />
        <TextField />
      </Fieldset>

      <Fieldset disabled legend="TextField test" error="errormessag fieldset">
        <TextField error="Error message" />
      </Fieldset>
      <Fieldset
        description="fieldsetDescription"
        error="fieldsetError"
        legend="TextField test"
      >
        <TextField description="textfieldDescription" error="Error message" />
      </Fieldset>
    </div>
  );
};
