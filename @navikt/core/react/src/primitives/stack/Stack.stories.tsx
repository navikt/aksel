import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { HStack, Spacer, Stack, VStack } from ".";
import { Box } from "../box";

export default {
  title: "ds-react/Primitives/Stack",
  component: HStack,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof HStack>;

type Story = StoryObj<typeof Stack>;

export const Horizontal: Story = {
  render: () => (
    <HStack gap="space-16">
      <Placeholders count={4} />
    </HStack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ height: "80vh", display: "flex" }}>
      <VStack gap="space-32">
        <Spacer />
        <HStack gap="space-16">
          <Placeholders count={1} />
          <Spacer />
          <Placeholders count={1} />
        </HStack>
        <HStack gap="space-16">
          <Placeholders count={1} />
          <Placeholders count={1} />
        </HStack>
        <HStack gap="space-16">
          <Placeholders count={2} />
        </HStack>
      </VStack>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const Vertical: Story = {
  render: () => (
    <VStack gap="space-16">
      <Placeholders count={4} />
    </VStack>
  ),
};

export const VerticalDemo: Story = {
  render: () => (
    <VStack gap="space-8">
      <VStack>
        <Placeholders count={4} />
      </VStack>
      <Placeholders count={4} />
      <VStack>
        <Placeholders count={4} />
      </VStack>
    </VStack>
  ),
};

export const VerticalAlign: Story = {
  render: () => (
    <VStack gap="space-16">
      <VStack align="start">
        <Placeholders count={2} />
      </VStack>
      <VStack align="center">
        <Placeholders count={2} />
      </VStack>
      <VStack align="end">
        <Placeholders count={2} />
      </VStack>
    </VStack>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const OverrideComponent: Story = {
  render: () => (
    <VStack gap="space-16" as="form" onSubmit={(e) => e.preventDefault()}>
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <VStack
      gap={{
        xs: "space-4",
        sm: "space-12",
        md: "space-24",
        lg: "space-40",
        xl: "space-64",
      }}
    >
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Nested: Story = {
  render: () => (
    <VStack gap="space-64">
      <Placeholders count={2}>
        <VStack gap="space-16">
          <Placeholders count={2} color="lightgray" />
        </VStack>
      </Placeholders>
    </VStack>
  ),
};

export const DividerDemo: Story = {
  render: () => (
    <div style={{ height: "80vh", width: "40rem" }}>
      <VStack gap={{ xs: "space-8", md: "space-24", lg: "space-48" }}>
        <HStack gap={{ xs: "space-8", md: "space-24", lg: "space-48" }}>
          <Placeholders count={1} />
          <Spacer />
          <Placeholders count={1} />
        </HStack>
        <hr
          style={{
            border: "none",
            borderBottom: "1px solid var(--ax-border-neutral)",
            margin: 0,
          }}
        />
        <HStack gap={{ xs: "space-8", md: "space-24", lg: "space-48" }}>
          <Placeholders count={2} />
        </HStack>
      </VStack>
    </div>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Box
      background="info-soft"
      padding="space-48"
      style={{ minWidth: "20rem", aspectRatio: "1/1" }}
    >
      <Stack
        align={{ xs: "center", md: "start" }}
        gap="space-8"
        direction={{ xs: "column", lg: "row" }}
      >
        <Box padding="space-24" background="accent-strong" />
        <Box padding="space-8" background="accent-strong" />
        <Box padding="space-24" background="accent-strong" />
        <Box padding="space-16" background="accent-strong" />
      </Stack>
    </Box>
  ),
};

function Placeholders({
  count,
  children,
  color,
}: {
  count: number;
  children?: React.ReactNode;
  color?: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: color ?? "var(--ax-bg-brand-blue-strong)",
            height: children ? "" : "3rem",
            width: children ? "" : "3rem",
          }}
        >
          {children}
        </div>
      ))}
    </>
  );
}

export const Chromatic: Story = {
  render: (props, context) => (
    <VStack gap="space-16">
      <h2>Spacing</h2>
      {Spacing.render?.(props, context)}
      <h2>Vertical</h2>
      {Vertical.render?.(props, context)}
      <h2>VerticalDemo</h2>
      {VerticalDemo.render?.(props, context)}
      <h2>VerticalAlign</h2>
      {VerticalAlign.render?.(props, context)}
      <h2>OverrideComponent</h2>
      {OverrideComponent.render?.(props, context)}
      <h2>Responsive</h2>
      {Responsive.render?.(props, context)}
      <h2>Nested</h2>
      {Nested.render?.(props, context)}
      <h2>DividerDemo</h2>
      {DividerDemo.render?.(props, context)}
      <h2>ResponsiveDirection</h2>
      {ResponsiveDirection.render?.(props, context)}
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
