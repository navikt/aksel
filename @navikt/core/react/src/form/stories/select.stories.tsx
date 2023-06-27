import React from "react";
import { Select } from "../index";
import { Meta } from "@storybook/react";
export default {
  title: "ds-react/Select",
  component: Select,
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

const content = (
  <>
    <option value="">Velg land</option>
    <option value="norge">Norge</option>
    <option value="sverige">Sverige</option>
  </>
);

export const Default = {
  render: (props) => {
    return (
      <Select {...props} label="Ipsum enim quis culpa">
        {content}
      </Select>
    );
  },

  args: {},
};

export const Small = () => {
  return (
    <Select size="small" label="Ipsum enim quis culpa">
      {content}
    </Select>
  );
};

export const Description = () => {
  return (
    <div className="colgap">
      <Select
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      >
        {content}
      </Select>
      <Select
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      >
        {content}
      </Select>
    </div>
  );
};

export const Error = () => {
  return (
    <div className="colgap">
      <Select
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      >
        {content}
      </Select>
      <Select
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        size="small"
      >
        {content}
      </Select>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="colgap">
      <Select label="Ipsum enim quis culpa" disabled>
        {content}
      </Select>
      <Select label="Ipsum enim quis culpa" disabled size="small">
        {content}
      </Select>
    </div>
  );
};

export const HideLabel = () => {
  return (
    <Select label="Ipsum enim quis culpa" hideLabel>
      {content}
    </Select>
  );
};

export const Readonly = () => {
  return (
    <div className="colgap">
      <Select
        label="Hvilkets land er du fra?"
        description="Velg landet du bor 180 dagen i året"
        readOnly
      >
        {content}
      </Select>
      <Select label="Hvilkets land er du fra?" readOnly error="feilmelding">
        {content}
      </Select>
    </div>
  );
};
