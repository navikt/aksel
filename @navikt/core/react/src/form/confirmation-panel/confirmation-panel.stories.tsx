import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Link } from "../../link";
import { ConfirmationPanel } from "./index";

export default {
  title: "ds-react/ConfirmationPanel",
  component: ConfirmationPanel,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    error: {
      type: "string",
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

type Story = StoryObj<typeof ConfirmationPanel>;

const content = (
  <>
    Ipsum voluptate pariatur <Link href="#123">testlink</Link> anim officia
    minim ut mollit voluptate exercitation nulla mollit.
  </>
);

export const Default = {
  render: (props) => {
    return (
      <ConfirmationPanel
        error={props?.error}
        size={props?.size}
        checked={props?.checked ?? undefined}
        label={props?.label ?? "Checkbox label text"}
      >
        {content}
      </ConfirmationPanel>
    );
  },

  args: {
    label: "Checkbox label text",
    checked: false,
  },
};

export const Small = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ConfirmationPanel
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Checkbox label text"
      size="small"
    >
      {content}
    </ConfirmationPanel>
  );
};

export const NoContent = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ConfirmationPanel
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Checkbox label text"
    />
  );
};

export const Error = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="colgap">
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
        error="Adipisicing sint aute quis veniam incididunt duis est sint aute cillum."
      >
        {content}
      </ConfirmationPanel>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
        error="Adipisicing sint aute quis veniam incididunt duis est sint aute cillum."
        size="small"
      >
        {content}
      </ConfirmationPanel>
    </div>
  );
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Default</h2>
        {Default.render?.(props)}
      </div>
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>No content</h2>
        <NoContent />
      </div>
      <div>
        <h2>Error</h2>
        <Error />
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
