import React from "react";
import type { Meta } from "@storybook/react";
import { HStack, VStack, Spacer } from ".";

export default {
  title: "ds-react/Primitives/Stack",
  component: HStack,
} satisfies Meta<typeof HStack>;

export const Horizontal = {
  render: () => (
    <HStack gap="4">
      <Placeholders count={4} />
    </HStack>
  ),
};

export const Spacing = {
  render: () => (
    <div style={{ height: "80vh", display: "flex" }}>
      <VStack gap="8">
        <Spacer />
        <HStack gap="4">
          <Placeholders count={1} />
          <Spacer />
          <Placeholders count={1} />
        </HStack>
        <HStack gap="4">
          <Placeholders count={1} />
          <Placeholders count={1} />
        </HStack>
        <HStack gap="4">
          <Placeholders count={2} />
        </HStack>
      </VStack>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const Vertical = {
  render: () => (
    <VStack gap="4">
      <Placeholders count={4} />
    </VStack>
  ),
};

export const VerticalDemo = {
  render: () => (
    <VStack gap="2">
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

export const VerticalAlign = {
  render: () => (
    <VStack gap="4">
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

export const OverrideComponent = {
  render: () => (
    <VStack gap="4" as="form" onSubmit={(e) => e.preventDefault()}>
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Responsive = {
  render: () => (
    <VStack gap={{ xs: "1", sm: "3", md: "6", lg: "10", xl: "16" }}>
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Nested = {
  render: () => (
    <VStack gap="16">
      <Placeholders count={2}>
        <VStack gap="4">
          <Placeholders count={2} color="gray" />
        </VStack>
      </Placeholders>
    </VStack>
  ),
};

export const DividerDemo = {
  render: () => (
    <div style={{ height: "80vh", width: "40rem" }}>
      <VStack gap={{ xs: "2", md: "6", lg: "12" }}>
        <HStack gap={{ xs: "2", md: "6", lg: "12" }}>
          <Placeholders count={1} />
          <Spacer />
          <Placeholders count={1} />
        </HStack>
        <hr
          style={{
            border: "none",
            borderBottom: "1px solid var(--a-border-divider)",
            margin: 0,
          }}
        />
        <HStack gap={{ xs: "2", md: "6", lg: "12" }}>
          <Placeholders count={2} />
        </HStack>
      </VStack>
    </div>
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
            backgroundColor: color ?? "var(--a-purple-200)",
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
