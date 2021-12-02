import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { TextField } from "../../index";
export default {
  title: "ds-react/form/fieldset",
  component: Fieldset,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Fieldset</h1>

      <Fieldset legend="Mollit eiusmod">
        <TextField label="Textfield label" hideLabel />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>Description</h2>

      <Fieldset
        legend="Mollit eiusmod"
        description={<div>Quis reprehenderit esse cillum</div>}
      >
        <TextField
          label="Textfield label"
          hideLabel
          description={<div>Quis reprehenderit esse cillum</div>}
        />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>Errors</h2>

      <Fieldset legend="Mollit eiusmod" error="Fieldsett error">
        <TextField label="Textfield label" hideLabel />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>Errors uten errorPropagation</h2>

      <Fieldset
        legend="Mollit eiusmod"
        error="Fieldsett error"
        errorPropagation={false}
      >
        <TextField label="Textfield label" hideLabel error="Må være fylt ut" />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>Sizing</h2>

      <Fieldset size="small" legend="Mollit eiusmod" description="Dolore minim">
        <TextField label="Textfield label" hideLabel />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>hideLegend</h2>

      <Fieldset legend="Mollit eiusmod" description="Dolore minim" hideLegend>
        <TextField label="Textfield label" hideLabel />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>

      <h2>Disabled</h2>

      <Fieldset legend="Mollit eiusmod" description="Dolore minim" disabled>
        <TextField label="Textfield label" hideLabel />
        <TextField label="Textfield label" hideLabel />
      </Fieldset>
    </div>
  );
};
