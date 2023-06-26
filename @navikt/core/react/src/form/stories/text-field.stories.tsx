import React from "react";
import { TextField } from "../index";
import { Meta } from "@storybook/react";
export default {
  title: "ds-react/TextField",
  component: TextField,
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
    hideLabel: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
} as Meta;

export const Default = {
  render: (props) => {
    return <TextField {...props} label="Ipsum enim quis culpa" />;
  },

  args: {},
};

export const Small = () => {
  return <TextField size="small" label="Ipsum enim quis culpa" />;
};

export const Description = () => {
  return (
    <div className="colgap">
      <TextField
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />
      <TextField
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      />
    </div>
  );
};

export const Error = () => {
  return (
    <div className="colgap">
      <TextField
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />

      <TextField
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="colgap">
      <TextField label="Ipsum enim quis culpa" disabled />
      <TextField label="Ipsum enim quis culpa" disabled size="small" />
    </div>
  );
};

export const HideLabel = () => {
  return <TextField label="Ipsum enim quis culpa" hideLabel />;
};

export const Readonly = () => {
  return (
    <div className="colgap">
      <TextField
        label="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        readOnly
      />
      <TextField label="Ipsum enim quis culpa" readOnly error="Errormessage" />
    </div>
  );
};
