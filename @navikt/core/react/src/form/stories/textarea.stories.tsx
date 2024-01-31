import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "../../button";
import { Modal } from "../../modal";
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
  },

  argTypes: {
    resize: {
      control: { type: "radio" },
      options: [true, "vertical", "horizontal"],
    },
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

export const Small: StoryFn = () => {
  return <Textarea size="small" label="Ipsum enim quis culpa" />;
};

export const Description: StoryFn = () => {
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

export const Error: StoryFn = () => {
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

export const Disabled: StoryFn = () => {
  return (
    <div className="colgap">
      <Textarea label="Ipsum enim quis culpa" disabled />
      <Textarea label="Ipsum enim quis culpa" disabled size="small" />
    </div>
  );
};

export const HideLabel: StoryFn = () => {
  return <Textarea label="Ipsum enim quis culpa" hideLabel />;
};

export const MaxLength: StoryFn = () => {
  return <Textarea maxLength={50} label="Ipsum enim quis culpa" />;
};

export const MinRows: StoryFn = () => {
  return <Textarea minRows={5} label="Ipsum enim quis culpa" />;
};

export const MaxRows: StoryFn = () => {
  return (
    <Textarea
      maxRows={3}
      value="Aute fugiat ut culpa enim ad culpa proident adipisicing anim proident ipsum elit. Cillum Lorem magna nisi cupidatat consequat culpa. Veniam ex quis elit dolore ea cupidatat fugiat in. Sint proident magna duis consequat velit ea velit pariatur in dolore ad. Aliqua officia nostrud veniam pariatur eu sint elit qui amet."
      label="Ipsum enim quis culpa"
    />
  );
};

export const Resize: StoryFn = () => {
  return <Textarea resize label="Ipsum enim quis culpa" />;
};

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      resize
      label="Ipsum enim quis culpa"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};

export const Readonly: StoryFn = () => {
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

export const AutoScrollbar: StoryFn<typeof Textarea> = (props) => (
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
      {...props}
      resize
      label="Textarea with autoScrollbar"
      description="Description"
      maxLength={30}
      UNSAFE_autoScrollbar
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

export const ModalStrictMode: StoryFn<typeof Textarea> = () => {
  // Story added after fixing an issue where TextareaAutoSize would reach max re-renders
  // and set the height to 2px when used in StrictMode in a Modal that is initially open.
  return (
    <React.StrictMode>
      <Modal open>
        <Modal.Body>
          <Textarea label="Har du noen tilbakemeldinger?" />
        </Modal.Body>
      </Modal>
    </React.StrictMode>
  );
};
ModalStrictMode.parameters = {
  chromatic: { disable: true }, // Not reproducable in Chromatic
};
