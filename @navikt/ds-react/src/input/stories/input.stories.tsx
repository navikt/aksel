import React from "react";
import { Input } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Fieldset } from "../../fieldset";
export default {
  title: "ds-react/form/input",
  component: Input,
} as Meta;

export const All = () => {
  return (
    <div>
      <Input />
      <br />
      <Input size="s" />
      <br />
      <Input label="Label for input" />
      <br />
      <Input label="Label for input" description="description for label" />
      <br />
      <Input
        size="s"
        label="Label for input"
        description="description for label"
      />
      <br />
      <Input
        size="s"
        label="Label for input"
        description="description for label"
        error="Error message"
      />
      <Fieldset legend="Input test" error="errormessag fieldset">
        <Input error="Error message" />
        <Input />
      </Fieldset>
    </div>
  );
};
