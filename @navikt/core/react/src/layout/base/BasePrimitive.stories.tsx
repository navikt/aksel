import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Box } from "../box";
import { HGrid } from "../grid";
import { Hide, Show } from "../responsive";
import { HStack, VStack } from "../stack";
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

const ResponsiveBreakpointDisplay = () => (
  <>
    <Show above="2xl">2xl</Show>
    <Show above="xl" below="2xl">
      xl
    </Show>
    <Show above="lg" below="xl">
      lg
    </Show>
    <Show above="md" below="lg">
      md
    </Show>
    <Show above="sm" below="md">
      sm
    </Show>
    <Hide above="sm">xs</Hide>
  </>
);

export const PaddingBreakpoints = () => (
  <BasePrimitive
    padding={{
      xs: "space-8",
      sm: "space-16",
      md: "space-32",
      lg: "space-64",
      xl: "space-96",
      "2xl": "space-128",
    }}
  >
    <Box background="info-soft">
      <ResponsiveBreakpointDisplay />
    </Box>
  </BasePrimitive>
);

export const PaddingBreakpointsInherit1 = () => (
  <BasePrimitive
    padding={{ xs: "space-8" }}
    paddingInline={{ md: "space-96 space-0" }}
  >
    <Box background="info-soft">
      <ResponsiveBreakpointDisplay />
    </Box>
  </BasePrimitive>
);

export const PaddingBreakpointsInherit2 = () => (
  <BasePrimitive
    padding={{ xs: "space-8", sm: "space-12" }}
    paddingInline={{ sm: "space-16 space-0", md: "space-96 space-0" }}
  >
    <Box background="info-soft">
      <ResponsiveBreakpointDisplay />
    </Box>
  </BasePrimitive>
);

export const Padding = () => (
  <VStack align="center" gap="space-8">
    <BasePrimitive padding="space-80">
      <Box borderWidth="1">Padding all around</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingBlock="space-80 space-0">
      <Box borderWidth="1">Padding to the North</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingInline="space-0 space-80">
      <Box borderWidth="1">Padding to the East</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingBlock="space-0 space-80">
      <Box borderWidth="1">Padding to the South</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingInline="space-80 space-0">
      <Box borderWidth="1">Padding to the West</Box>
    </BasePrimitive>
  </VStack>
);

export const Margin = () => (
  <VStack align="center" gap="space-8">
    <Box background="info-soft">
      <BasePrimitive margin="space-80">
        <Box borderWidth="1">Margin all around</Box>
      </BasePrimitive>
    </Box>
    <Box background="info-soft">
      <BasePrimitive margin="space-4" marginBlock="space-80 space-0">
        <Box borderWidth="1">Margin to the North</Box>
      </BasePrimitive>
    </Box>
    <Box background="info-soft">
      <BasePrimitive margin="space-4" marginInline="space-0 space-80">
        <Box borderWidth="1">Margin to the East</Box>
      </BasePrimitive>
    </Box>
    <Box background="info-soft">
      <BasePrimitive margin="space-4" marginBlock="space-0 space-80">
        <Box borderWidth="1">Margin to the South</Box>
      </BasePrimitive>
    </Box>
    <Box background="info-soft">
      <BasePrimitive margin="space-4" marginInline="space-80 space-0">
        <Box borderWidth="1">Margin to the West</Box>
      </BasePrimitive>
    </Box>
  </VStack>
);

export const MarginAuto = () => (
  <Box width="400px" background="info-soft">
    <BasePrimitive marginInline="auto">
      <Box borderWidth="1" width="200px">
        MarginInline: auto
      </Box>
    </BasePrimitive>
    <BasePrimitive marginInline="auto space-0" marginBlock="space-8">
      <Box borderWidth="1" width="200px">
        MarginInline: auto 0
      </Box>
    </BasePrimitive>
    <BasePrimitive marginInline="space-0 auto" marginBlock="space-8">
      <Box borderWidth="1" width="200px">
        MarginInline: 0 auto
      </Box>
    </BasePrimitive>
  </Box>
);

export const HeightWidth = () => (
  <VStack align="center" gap="space-8">
    <BasePrimitive height="4rem">
      <Box borderWidth="1">height 4 rem</Box>
    </BasePrimitive>
    <BasePrimitive minHeight="4rem">
      <Box borderWidth="1">min-height 4 rem</Box>
    </BasePrimitive>
    <BasePrimitive maxHeight="4rem" height="10rem">
      <Box borderWidth="1">max-height 4 rem</Box>
    </BasePrimitive>

    <BasePrimitive width="4rem">
      <Box borderWidth="1">width 4 rem</Box>
    </BasePrimitive>
    <BasePrimitive minWidth="12rem">
      <Box borderWidth="1">min-width 12 rem</Box>
    </BasePrimitive>
    <BasePrimitive maxWidth="4rem" width="20rem">
      <Box borderWidth="1">max-width 4 rem</Box>
    </BasePrimitive>
  </VStack>
);

export const PositionAbsolute = () => (
  <div
    style={{
      position: "relative",
      height: 200,
      width: 300,
      border: "1px solid gray",
    }}
  >
    <BasePrimitive position="absolute" inset="space-0">
      <div style={{ display: "grid", placeContent: "center" }}>inset 0</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" top="space-16" right="space-0">
      <div>Top</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" bottom="space-16">
      <div>bottom</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" right="space-16" bottom="space-0">
      <div>right</div>
    </BasePrimitive>
    <BasePrimitive position="absolute" left="space-16">
      <div>left</div>
    </BasePrimitive>
  </div>
);

export const Overflow = () => (
  <VStack gap="space-32">
    <BasePrimitive overflow="scroll" maxHeight="100px" maxWidth="100px">
      <Box borderWidth="1">
        <div style={{ width: 200, height: 200 }}>scroll</div>
      </Box>
    </BasePrimitive>
    <BasePrimitive
      overflowX="scroll"
      overflowY="hidden"
      maxHeight="100px"
      maxWidth="100px"
    >
      <Box borderWidth="1">
        <div style={{ width: 200, height: 200 }}>scroll-x</div>
      </Box>
    </BasePrimitive>
    <BasePrimitive
      overflowY="scroll"
      overflowX="hidden"
      maxHeight="100px"
      maxWidth="100px"
    >
      <Box borderWidth="1">
        <div style={{ width: 200, height: 200 }}>scroll-y</div>
      </Box>
    </BasePrimitive>
  </VStack>
);

export const Flex = () => (
  <VStack gap="space-32">
    <HStack align="center" gap="space-8">
      <BasePrimitive flexGrow="1">
        <Box borderWidth="1">grow 1</Box>
      </BasePrimitive>
      <BasePrimitive flexShrink="0">
        <Box borderWidth="1">shrink 0</Box>
      </BasePrimitive>
      <BasePrimitive flexBasis="200px">
        <Box borderWidth="1">flex basis 200px</Box>
      </BasePrimitive>
    </HStack>
    <h2>Flex basis</h2>
    <HStack align="center" gap="space-0">
      <BasePrimitive flexBasis="33%">
        <Box borderWidth="1">33%</Box>
      </BasePrimitive>
      <BasePrimitive flexBasis="66%">
        <Box borderWidth="1">66%</Box>
      </BasePrimitive>
      <BasePrimitive flexBasis="20%">
        <Box borderWidth="1">20%</Box>
      </BasePrimitive>
      <BasePrimitive flexBasis="80%">
        <Box borderWidth="1">80%</Box>
      </BasePrimitive>
    </HStack>
  </VStack>
);

export const Grid = () => (
  <VStack gap="space-32">
    <h2>Static columns</h2>
    <HGrid gap="space-8" columns="1fr 1fr 1fr">
      <BasePrimitive gridColumn="1 / span 2">
        <Box borderWidth="1">2 columns</Box>
      </BasePrimitive>
      <BasePrimitive gridColumn="3 / span 1">
        <Box borderWidth="1">1 columns</Box>
      </BasePrimitive>
    </HGrid>
    <h2>Dynamic columns</h2>
    <HGrid gap="space-8" columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <BasePrimitive
        gridColumn={{
          xs: "1 / span 1",
          sm: "1 / span 2",
          md: "1 / span 3",
          lg: "1 / span 4",
          xl: "1 / span 5",
          "2xl": "1 / span 6",
        }}
      >
        <Box borderWidth="1">C</Box>
      </BasePrimitive>
    </HGrid>
  </VStack>
);

export const NewSpaceTokens = () => (
  <VStack align="center" gap="space-8">
    <BasePrimitive padding="space-80">
      <Box borderWidth="1">Padding all around</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingBlock="space-80 space-0">
      <Box borderWidth="1">Padding to the North</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingInline="space-0 space-80">
      <Box borderWidth="1">Padding to the East</Box>
    </BasePrimitive>
    <BasePrimitive padding="space-4" paddingInline="space-80">
      <Box borderWidth="1">mix</Box>
    </BasePrimitive>
    <BasePrimitive padding={{ md: "space-8", lg: "space-16", xl: "space-32" }}>
      <Box background="info-soft">
        <ResponsiveBreakpointDisplay />
      </Box>
    </BasePrimitive>
  </VStack>
);

export const Chromatic: Story = {
  render: () => (
    <VStack align="center" gap="space-24">
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
        <h2>Padding</h2>
        <Padding />
      </div>
      <div>
        <h2>Margin</h2>
        <Margin />
      </div>
      <div>
        <h2>MarginAuto</h2>
        <MarginAuto />
      </div>

      <div>
        <h2>Height & Width</h2>
        <HeightWidth />
      </div>
      <div>
        <h2>Position Absolute</h2>
        <PositionAbsolute />
      </div>
      <div>
        <h2>Overflow</h2>
        <Overflow />
      </div>
      <div>
        <h2>Flex</h2>
        <Flex />
      </div>
      <div>
        <h2>Grid</h2>
        <Grid />
      </div>
    </VStack>
  ),

  parameters: {
    chromatic: { disable: false },
  },
};
