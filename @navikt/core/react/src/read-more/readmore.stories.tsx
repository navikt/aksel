import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { ReadMore } from ".";
import { VStack } from "../layout/stack";

export default {
  title: "ds-react/ReadMore",
  component: ReadMore,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ReadMore>;

type Story = StoryObj<typeof ReadMore>;

const Content = (
  <div style={{ maxWidth: 300 }}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, tempore
    corporis exercitationem minus dignissimos eius aspernatur fugiat iusto.
  </div>
);

export const Default: Story = {
  args: {
    size: "medium",
    defaultOpen: false,
    onOpenChange: fn(),
    children: Content,
    header: "Grunnen til at vi spør om dette og i tillegg ber om vedlegg",
  },
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const DefaultOpen: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Chromatic: Story = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <h2>Default</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ReadMore {...Default.args} />
        </div>
        <div>
          <h2>Small</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ReadMore {...Small.args} />
        </div>
        <div>
          <h2>DefaultOpen</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ReadMore {...DefaultOpen.args} />
        </div>
        <div>
          <h2>Controlled open</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ReadMore {...Open.args} />
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
