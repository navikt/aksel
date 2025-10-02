import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React from "react";
import Select, { SelectProps } from "./Select";

const meta: Meta<typeof Select> = {
  title: "ds-react/Select",
  component: Select,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

const content = (
  <>
    <option value="">Velg land</option>
    <option value="norge">Norge</option>
    <option value="sverige">Sverige</option>
  </>
);

export const Default: StoryFn<Omit<SelectProps, "children">> = (props) => (
  <Select {...props}>{content}</Select>
);
Default.args = {
  label: "Ipsum enim quis culpa",
};
Default.argTypes = {
  description: {
    type: "string",
  },
  size: {
    control: { type: "radio" },
    options: ["medium", "small"],
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
  readOnly: {
    type: "boolean",
  },
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

export const WithError = () => {
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

export const ColorRole = () => {
  return (
    <div className="colgap" data-color="brand-magenta">
      <Description />
      <WithError />
      <Disabled />
      <Readonly />
    </div>
  );
};

export const Chromatic: StoryObj<typeof Select> = {
  render: () => (
    <div>
      <div>
        <h2>Default</h2>
        <Default label="Ipsum enim quis culpa" />
      </div>
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>Description</h2>
        <Description />
      </div>
      <div>
        <h2>WithError</h2>
        <WithError />
      </div>
      <div>
        <h2>Disabled</h2>
        <Disabled />
      </div>
      <div>
        <h2>HideLabel</h2>
        <HideLabel />
      </div>
      <div>
        <h2>Readonly</h2>
        <Readonly />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
