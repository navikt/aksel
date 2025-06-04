import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../../layout/stack";
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

export const Description: Story = {
  args: {
    children: "Label text",
    description: "Cillum sint exercitation ut cillum.",
  },
};

export const Loading: Story = {
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
};

export const Disabled: Story = {
  render: () => (
    <div className="colgap">
      <Switch disabled>Label text</Switch>

      <Switch checked disabled>
        Label text
      </Switch>
    </div>
  ),
};

export const HideLabel: Story = {
  render: () => (
    <div className="colgap">
      <Switch hideLabel>Label text</Switch>

      <Switch checked hideLabel>
        Label text
      </Switch>
    </div>
  ),
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
};

export const ColorRole: Story = {
  render: () => (
    <div className="colgap" data-color="brand-magenta">
      <div>
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Description.args} position="left" />
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Description.args} checked position="left" />
      </div>
      <div>
        {/* @ts-expect-error Args are Partial here */}
        <Disabled.render />
      </div>
      <div>
        {/* @ts-expect-error Args are Partial here */}
        <Loading.render />
      </div>
    </div>
  ),
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4" align="start">
      <div>
        <h2>Default</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Default.args} />
      </div>
      <div>
        <h2>Small</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Small.args} position="left" />
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Small.args} position="right" />
      </div>
      <div>
        <h2>Description</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Description.args} position="left" />
        {/* @ts-expect-error Args are Partial here */}
        <Switch {...Description.args} position="right" />
      </div>
      <div>
        <h2>Loading</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Loading.render />
      </div>
      <div>
        <h2>Disabled</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Disabled.render />
      </div>
      <div>
        <h2>HideLabel</h2>
        {/* @ts-expect-error Args are Partial here */}
        <HideLabel.render />
      </div>
      <div>
        <h2>Readonly</h2>
        {/* @ts-expect-error Args are Partial here */}
        <Readonly.render />
      </div>
      <div>
        <h2>ColorRole</h2>
        {/* @ts-expect-error Args are Partial here */}
        <ColorRole.render />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
