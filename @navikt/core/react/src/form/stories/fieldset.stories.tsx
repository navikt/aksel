import React from "react";
import { Fieldset } from "../index";
import { Meta } from "@storybook/react";
import { TextField } from "../../index";
export default {
  title: "ds-react/form/Fieldset",
  component: Fieldset,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    description: {
      type: "string",
    },
    error: {
      type: "string",
    },
    hideLegend: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
} as Meta;

const content = (
  <>
    <TextField label="Textfield label" hideLabel />
    <TextField label="Textfield label" hideLabel />
  </>
);

export const Default = (props) => {
  return (
    <Fieldset legend="Mollit eiusmod" {...props}>
      {content}
    </Fieldset>
  );
};

Default.args = {
  errorPropagation: true,
};

export const Small = () => (
  <Fieldset
    size="small"
    legend="Mollit eiusmod"
    description="Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure."
  >
    {content}
  </Fieldset>
);

export const Description = () => (
  <Fieldset
    legend="Mollit eiusmod"
    description="Esse cupidatat reprehenderit est culpa consectetur sit dolor esse."
  >
    <TextField
      label="Textfield label"
      description="Amet quis cillum incididunt "
    />
    <TextField
      label="Textfield label"
      description="Enim et occaecat voluptate labore sit do exercitation laborum non "
    />
  </Fieldset>
);

export const ErrorPropagation = () => (
  <Fieldset
    legend="Mollit eiusmod"
    error="Fieldsett error"
    errorPropagation={false}
  >
    <TextField label="Textfield label" hideLabel error="Må være fylt ut" />
    <TextField label="Textfield label" hideLabel />
  </Fieldset>
);

export const Error = () => (
  <div className="colgap">
    <Fieldset
      legend="Mollit eiusmod"
      error="Laborum officia nisi aliqua esse minim in amet."
    >
      {content}
    </Fieldset>
    <Fieldset
      size="small"
      legend="Mollit eiusmod"
      error="Laborum officia nisi aliqua esse minim in amet."
    >
      {content}
    </Fieldset>
  </div>
);

export const Disabled = () => (
  <div className="colgap">
    <Fieldset legend="Mollit eiusmod" disabled>
      {content}
    </Fieldset>
    <Fieldset size="small" legend="Mollit eiusmod" disabled>
      {content}
    </Fieldset>
  </div>
);

export const hideLegend = () => (
  <Fieldset legend="Mollit eiusmod" hideLegend>
    {content}
  </Fieldset>
);
