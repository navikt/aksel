import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { fn } from "storybook/test";
import { ReadMore } from ".";
import { VStack } from "../primitives/stack";

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

export const Large: Story = {
  args: {
    ...Default.args,
    size: "large",
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

export const BrandVolumeLow: Story = {
  render: () => (
    <VStack gap="space-16">
      <ReadMore size="large" header={Default.args?.header}>
        {Content}
      </ReadMore>
      <ReadMore header={Default.args?.header}>{Content}</ReadMore>
      <ReadMore size="small" header={Default.args?.header}>
        {Content}
      </ReadMore>
    </VStack>
  ),
  args: {
    ...Default.args,
    open: true,
  },
};

export const ColorRole: Story = {
  render: () => (
    <VStack gap="space-16" data-color="brand-magenta">
      <ReadMore size="large" header={Default.args?.header}>
        {Content}
      </ReadMore>
      <ReadMore header={Default.args?.header}>{Content}</ReadMore>
      <ReadMore size="small" header={Default.args?.header}>
        {Content}
      </ReadMore>
    </VStack>
  ),
  args: {
    ...Default.args,
    open: true,
  },
};

export const Chromatic: Story = {
  render: (...props) => {
    return (
      <VStack gap="space-16">
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
          <h2>Large</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ReadMore {...Large.args} />
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
        <div>
          <h2>BrandVolumeLow</h2>
          {BrandVolumeLow?.render?.(...props)}
        </div>
        <div>
          <h2>ColorRole</h2>
          {ColorRole?.render?.(...props)}
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
