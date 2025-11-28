import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import Switch from "./Switch";

export default {
  title: "ds-react/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small"],
    },
    position: {
      control: {
        type: "radio",
      },
      options: ["right", "left"],
    },
    description: {
      type: "string",
    },
    hideLabel: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    loading: {
      type: "boolean",
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    children: "Label text",
  },
};

export const Small: Story = {
  args: {
    children: "Label text",
    size: "small",
  },
};

export const Description = {
  args: {
    children: "Label text",
    description: "Cillum sint exercitation ut cillum.",
  },
} satisfies Story;

export const Loading = {
  render: () => {
    return (
      <div className="colgap">
        <div className="colgap">
          <Switch loading>Label text</Switch>

          <Switch checked loading>
            Label text
          </Switch>
        </div>
        <div className="colgap">
          <Switch loading size="small">
            Label text
          </Switch>
          <Switch checked loading size="small">
            Label text
          </Switch>
        </div>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
} satisfies Story;

export const Disabled = {
  render: () => (
    <div className="colgap">
      <Switch disabled>Label text</Switch>

      <Switch checked disabled>
        Label text
      </Switch>
    </div>
  ),
  parameters: { controls: { disable: true } },
} satisfies Story;

export const HideLabel: Story = {
  render: () => (
    <div className="colgap">
      <Switch hideLabel>Label text</Switch>

      <Switch checked hideLabel>
        Label text
      </Switch>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Readonly: Story = {
  render: () => (
    <div className="colgap">
      <Switch description="Slår av alle notifikasjoner" readOnly>
        Notifikasjoner
      </Switch>

      <Switch checked readOnly>
        Notifikasjoner
      </Switch>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const ColorRole: Story = {
  render: () => (
    <div className="colgap" data-color="brand-magenta">
      <div>
        <Switch {...Description.args} position="left" />
        <Switch {...Description.args} checked position="left" />
      </div>
      <div>
        <Disabled.render />
      </div>
      <div>
        <Loading.render />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Chromatic = renderStoriesForChromatic(
  {
    Default,
    DefaultRight: { ...Default, args: { ...Default.args, position: "right" } },
    Small,
    SmallRight: { ...Small, args: { ...Small.args, position: "right" } },
    Description,
    DescriptionRight: {
      ...Description,
      args: { ...Description.args, position: "right" },
    },
    Loading,
    Disabled,
    HideLabel,
    Readonly,
    ColorRole,
  },
  Switch,
);
