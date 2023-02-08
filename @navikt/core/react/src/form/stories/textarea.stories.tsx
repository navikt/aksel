import { Meta } from "@storybook/react";
import React from "react";
import { Textarea } from "../index";
export default {
  title: "ds-react/Textarea",
  component: Textarea,
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
    maxRows: {
      type: "number",
    },
    minRows: {
      type: "number",
    },
  },
} as Meta;

export const Default = {
  render: (props) => {
    return (
      <Textarea
        {...props}
        maxLength={props?.maxLength ?? 100}
        label="Ipsum enim quis culpa"
      />
    );
  },

  args: {
    maxLength: 100,
    resize: false,
  },
};

export const Small = () => {
  return <Textarea size="small" label="Ipsum enim quis culpa" />;
};

export const Description = () => {
  return (
    <div className="colgap">
      <Textarea
        label="Ipsum enim quis culpa"
        description="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />
      <Textarea
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
      <Textarea
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
      />

      <Textarea
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
      <Textarea label="Ipsum enim quis culpa" disabled />
      <Textarea label="Ipsum enim quis culpa" disabled size="small" />
    </div>
  );
};

export const HideLabel = () => {
  return <Textarea label="Ipsum enim quis culpa" hideLabel />;
};

export const MaxLength = () => {
  return <Textarea maxLength={200} label="Ipsum enim quis culpa" />;
};

export const MinRows = () => {
  return <Textarea minRows={5} label="Ipsum enim quis culpa" />;
};

export const MaxRows = () => {
  return (
    <Textarea
      maxRows={3}
      value="Aute fugiat ut culpa enim ad culpa proident adipisicing anim proident ipsum elit. Cillum Lorem magna nisi cupidatat consequat culpa. Veniam ex quis elit dolore ea cupidatat fugiat in. Sint proident magna duis consequat velit ea velit pariatur in dolore ad. Aliqua officia nostrud veniam pariatur eu sint elit qui amet."
      label="Ipsum enim quis culpa"
    />
  );
};

export const Resize = () => {
  return <Textarea resize label="Ipsum enim quis culpa" />;
};
