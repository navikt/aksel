import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../button";
import { Textarea } from "../index";

const meta: Meta<typeof Textarea> = {
  title: "ds-react/Textarea",
  component: Textarea,
};
export default meta;

export const Default: StoryObj<typeof Textarea> = {
  render: (props) => {
    return <Textarea {...props} />;
  },

  args: {
    maxLength: 0,
    label: "Ipsum enim quis culpa",
    resize: false,
  },

  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    description: { type: "string" },
    error: { type: "string" },
    hideLabel: { type: "boolean" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
    maxRows: { type: "number" },
    minRows: { type: "number" },
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

      <Textarea
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        maxLength={20}
      />

      <Textarea
        label="Ipsum enim quis culpa"
        error="Consectetur labore velit eiusmod Lorem ut nostrud mollit labore ullamco laboris laboris in."
        value="Sed dignissim sollicitudin porta."
        maxLength={20}
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

export const Readonly = () => {
  return (
    <div className="colgap">
      <Textarea
        label="På hvilket grunnlag har du tatt denne vurderingen?"
        description="Beskriv i korte punkter"
        value="Denne vurderingen ble gjort på grunnlag av X og Y"
        readOnly
      />
      <Textarea
        label="På hvilket grunnlag har du tatt denne vurderingen?"
        readOnly
        value="Denne vurderingen ble gjort på grunnlag av X og Y"
        error="feilmelding"
      />
    </div>
  );
};

export const AutoScrollbar = (props) => (
  <div
    style={{
      border: "1px solid lightGreen",
      height: "90vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ border: "1px dashed gray" }}>
      <h1>Header</h1>
    </div>
    <Textarea
      resize
      label="Textarea with autoScrollbar"
      description="Description"
      maxLength={30}
      UNSAFE_autoScrollbar
      {...props}
    />
    <div style={{ border: "1px dashed gray" }}>
      <Button>Send</Button>
    </div>
  </div>
);
AutoScrollbar.argTypes = {
  error: { type: "string" },
  hideLabel: { type: "boolean" },
  maxRows: { type: "number" },
  minRows: { type: "number" },
};
