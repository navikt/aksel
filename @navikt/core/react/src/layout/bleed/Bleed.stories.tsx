import type { Meta } from "@storybook/react";
import React from "react";
import { BodyLong } from "../../typography";
import { Box } from "../box";
import { HStack, VStack } from "../stack";
import { Bleed } from "./Bleed";

export default {
  title: "ds-react/Primitives/Bleed",
  component: Bleed,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Bleed>;

export const Default = {
  render: () => (
    <>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="10 0">
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="0 10">
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="10 0">
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="0 10">
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginBlock=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
  ),
};

export const AsChild = {
  render: () => (
    <>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="10 0" asChild>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="0 10" asChild>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="10 0" asChild>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="0 10" asChild>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>marginBlock=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
  ),
};

export const Breakpoints = {
  render: () => (
    <>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginInline={{ xs: "10 0", md: "20 0" }}>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>
                  {'marginInline={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginInline={{ xs: "0 10", md: "0 20" }}>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>
                  {'marginInline={{ xs: "0 10", md: "0 20" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginBlock={{ xs: "10 0", md: "20 0" }}>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>
                  {'marginBlock={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginBlock={{ xs: "0 10", md: "0 20" }}>
              <Box padding="3" background="surface-success-subtle">
                <BodyLong>
                  {'marginBlock={{ xs: "0 10", md: "0 20" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
  ),
};

export const Px = {
  render: () => (
    <>
      <style>
        {`
      .circle {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .scale {
        transform: scale(5);
      }
      `}
      </style>
      <Box padding="32">
        <HStack className="" gap="32">
          <Box
            className="circle scale"
            background="surface-success-subtle"
            borderRadius="full"
          >
            L
          </Box>
          <Box
            className="circle scale"
            background="surface-success-subtle"
            borderRadius="full"
          >
            <Bleed marginInline="0 px">L</Bleed>
          </Box>
        </HStack>
      </Box>
    </>
  ),
};

export const Full = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <>
      <style>
        {`
        .maxWidth {
          max-width: 300px;
        }
        `}
      </style>
      <VStack gap="2" align="center">
        <Box
          className="maxWidth"
          background="surface-alt-1-subtle"
          padding="10"
        >
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="full">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="surface-alt-1-subtle"
          padding="10"
        >
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="full 0">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;full 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="surface-alt-1-subtle"
          padding="10"
        >
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="0 full">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;0 full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="surface-alt-1-subtle"
          padding="10"
        >
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="full" reflectivePadding asChild>
              <Box background="surface-success-subtle">
                <BodyLong>full + reflectivePadding</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
  ),
};

export const ReflectivePadding = {
  render: () => (
    <>
      <style>
        {`
      .navds-bleed {
        background-color: var(--a-surface-success-subtle);
        width: fit-content;
      }
      `}
      </style>
      <HStack gap="3">
        <VStack gap="2">
          <p>CSS string</p>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0" asChild>
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0" reflectivePadding asChild>
                <BodyLong>with reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
        </VStack>

        <VStack gap="2">
          <p>breakpoints</p>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed
                marginInline={{
                  xs: "4 0",
                  sm: "8 0",
                  md: "12 0",
                  lg: "16 0",
                  xl: "20 0",
                }}
                asChild
              >
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed
                marginInline={{
                  xs: "4 0",
                  sm: "8 0",
                  md: "12 0",
                  lg: "16 0",
                  xl: "20 0",
                }}
                reflectivePadding
                asChild
              >
                <BodyLong>with reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
        </VStack>
      </HStack>
    </>
  ),
};

export const Chromatic = {
  render: () => (
    <VStack gap="4">
      <h2>Default</h2>
      <Default.render />
      <h2>AsChild</h2>
      <AsChild.render />
      <h2>Breakpoints</h2>
      <Breakpoints.render />
      <h2>Px</h2>
      <Px.render />
      <h2>Full</h2>
      <Full.render />
      <h2>ReflectivePadding</h2>
      <ReflectivePadding.render />
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
