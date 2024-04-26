import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BodyLong } from "../../typography";
import { Box } from "../box";
import { VStack } from "../stack";
import { BasePrimitive } from "./BasePrimitive";

const meta: Meta<typeof BasePrimitive> = {
  title: "ds-react/Primitives/BasePrimitive",
  component: BasePrimitive,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof BasePrimitive>;

export const Default: Story = {
  args: {
    children: (
      <div>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
        Proident pariatur proident pariatur magna consequat velit id commodo
        quis sunt tempor ullamco aliquip pariatur.
      </div>
    ),
  },
};

export const PaddingBreakpoints = () => (
  <BasePrimitive
    padding={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6", "2xl": "8" }}
  >
    <Box background="surface-alt-3-subtle">
      This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
      nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
      Proident pariatur proident pariatur magna consequat velit id commodo quis
      sunt tempor ullamco aliquip pariatur.
    </Box>
  </BasePrimitive>
);

export const PaddingBreakpointsInherit1 = () => (
  <BasePrimitive padding={{ xs: "2" }} paddingInline={{ md: "24 0" }}>
    <Box background="surface-alt-3-subtle">
      This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
      nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
      Proident pariatur proident pariatur magna consequat velit id commodo quis
      sunt tempor ullamco aliquip pariatur.
    </Box>
  </BasePrimitive>
);

export const PaddingBreakpointsInherit2 = () => (
  <BasePrimitive
    padding={{ xs: "2", sm: "3" }}
    paddingInline={{ sm: "4 0", md: "24 0" }}
  >
    <Box background="surface-alt-3-subtle">
      This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
      nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
      Proident pariatur proident pariatur magna consequat velit id commodo quis
      sunt tempor ullamco aliquip pariatur.
    </Box>
  </BasePrimitive>
);

export const Padding = () => (
  <VStack align="center" gap="2">
    <BasePrimitive padding="20">
      <BodyLong>Padding all around</BodyLong>
    </BasePrimitive>
    <BasePrimitive padding="1" paddingBlock="20 0">
      <BodyLong>Padding to the North</BodyLong>
    </BasePrimitive>
    <BasePrimitive padding="1" paddingInline="0 20">
      <BodyLong>Padding to the East</BodyLong>
    </BasePrimitive>
    <BasePrimitive padding="1" paddingBlock="0 20">
      <BodyLong>Padding to the South</BodyLong>
    </BasePrimitive>
    <BasePrimitive padding="1" paddingInline="20 0">
      <BodyLong>Padding to the West</BodyLong>
    </BasePrimitive>
  </VStack>
);

export const HeightWidth = () => (
  <VStack align="center" gap="2">
    <BasePrimitive height="2rem">
      <div>height 2 rem</div>
    </BasePrimitive>
    <BasePrimitive minHeight="2rem">
      <div>min-height 2 rem</div>
    </BasePrimitive>
    <BasePrimitive maxHeight="2rem">
      <div>max-height 2 rem</div>
    </BasePrimitive>
    <BasePrimitive height="2rem">
      <div>width 2 rem</div>
    </BasePrimitive>
    <BasePrimitive minWidth="2rem">
      <div>min-width 2 rem</div>
    </BasePrimitive>
    <BasePrimitive maxWidth="2rem">
      <div>max-width 2 rem</div>
    </BasePrimitive>
  </VStack>
);

export const PositionAbsolute = () => (
  <div
    style={{
      position: "relative",
      height: 200,
      width: 300,
      background: "gray",
    }}
  >
    <BasePrimitive position="absolute" inset="0">
      <div style={{ display: "grid", placeContent: "center" }}>inset 0</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" top="4" right="0">
      <div>Top</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" bottom="4">
      <div>bottom</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" right="4" bottom="0">
      <div>right</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" left="4">
      <div>left</div>
    </BasePrimitive>
  </div>
);

export const Chromatic: Story = {
  render: () => (
    <VStack align="center" gap="6">
      <div>
        <h2>Padding</h2>
        <Padding />
      </div>
      <div>
        <h2>PaddingBreakpoints</h2>
        <PaddingBreakpoints />
      </div>
      <div>
        <h2>PaddingBreakpointsInherit1</h2>
        <PaddingBreakpointsInherit1 />
      </div>
      <div>
        <h2>PaddingBreakpointsInherit2</h2>
        <PaddingBreakpointsInherit2 />
      </div>

      <div>
        <h2>Height & Width</h2>
        <HeightWidth />
      </div>
    </VStack>
  ),

  parameters: {
    chromatic: { disable: false },
  },
};
