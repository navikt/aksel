import type { Meta } from "@storybook/react-vite";
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
      <VStack gap="space-8">
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginInline="space-40 space-0">
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginInline="space-0 space-40">
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginBlock="space-40 space-0">
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginBlock="space-0 space-40">
              <Box padding="space-12" background="success-soft">
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
      <VStack gap="space-8">
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginInline="space-40 space-0" asChild>
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginInline="space-0 space-40" asChild>
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginBlock="space-40 space-0" asChild>
              <Box padding="space-12" background="success-soft">
                <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="meta-purple-soft" padding="space-20">
          <Box background="meta-lime-soft" padding="space-20">
            <Bleed marginBlock="space-0 space-40" asChild>
              <Box padding="space-12" background="success-soft">
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
      <VStack gap="space-8">
        <Box
          background="meta-purple-soft"
          padding={{ xs: "space-20", md: "space-40" }}
        >
          <Box
            background="meta-lime-soft"
            padding={{ xs: "space-20", md: "space-40" }}
          >
            <Bleed
              marginInline={{ xs: "space-40 space-0", md: "space-80 space-0" }}
            >
              <Box padding="space-12" background="success-soft">
                <BodyLong>
                  {'marginInline={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          background="meta-purple-soft"
          padding={{ xs: "space-20", md: "space-40" }}
        >
          <Box
            background="meta-lime-soft"
            padding={{ xs: "space-20", md: "space-40" }}
          >
            <Bleed
              marginInline={{ xs: "space-0 space-40", md: "space-0 space-80" }}
            >
              <Box padding="space-12" background="success-soft">
                <BodyLong>
                  {'marginInline={{ xs: "0 10", md: "0 20" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          background="meta-purple-soft"
          padding={{ xs: "space-20", md: "space-40" }}
        >
          <Box
            background="meta-lime-soft"
            padding={{ xs: "space-20", md: "space-40" }}
          >
            <Bleed
              marginBlock={{ xs: "space-40 space-0", md: "space-80 space-0" }}
            >
              <Box padding="space-12" background="success-soft">
                <BodyLong>
                  {'marginBlock={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          background="meta-purple-soft"
          padding={{ xs: "space-20", md: "space-40" }}
        >
          <Box
            background="meta-lime-soft"
            padding={{ xs: "space-20", md: "space-40" }}
          >
            <Bleed
              marginBlock={{ xs: "space-0 space-40", md: "space-0 space-80" }}
            >
              <Box padding="space-12" background="success-soft">
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
      <Box padding="space-128">
        <HStack className="" gap="space-128">
          <Box
            className="circle scale"
            background="success-soft"
            borderRadius="full"
          >
            L
          </Box>
          <Box
            className="circle scale"
            background="success-soft"
            borderRadius="full"
          >
            <Bleed marginInline="space-0 space-1">L</Bleed>
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
      <VStack gap="space-8" align="center">
        <Box
          className="maxWidth"
          background="meta-purple-soft"
          padding="space-40"
        >
          <Box background="meta-lime-soft" padding="space-40">
            <Bleed marginInline="full">
              <Box background="success-soft">
                <BodyLong>marginInline=&quot;full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="meta-purple-soft"
          padding="space-40"
        >
          <Box background="meta-lime-soft" padding="space-40">
            <Bleed marginInline="full space-0">
              <Box background="success-soft">
                <BodyLong>marginInline=&quot;full 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="meta-purple-soft"
          padding="space-40"
        >
          <Box background="meta-lime-soft" padding="space-40">
            <Bleed marginInline="space-0 full">
              <Box background="success-soft">
                <BodyLong>marginInline=&quot;0 full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box
          className="maxWidth"
          background="meta-purple-soft"
          padding="space-40"
        >
          <Box background="meta-lime-soft" padding="space-40">
            <Bleed marginInline="full" reflectivePadding asChild>
              <Box background="success-soft">
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
      .aksel-bleed {
        background-color: var(--ax-bg-success-moderate);
        width: fit-content;
      }
      `}
      </style>
      <HStack gap="space-12">
        <VStack gap="space-8">
          <p>CSS string</p>
          <Box background="meta-purple-soft" padding="space-20">
            <Box background="meta-lime-soft" padding="space-20">
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="meta-purple-soft" padding="space-20">
            <Box background="meta-lime-soft" padding="space-20">
              <Bleed marginInline="space-40 space-0" asChild>
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="meta-purple-soft" padding="space-20">
            <Box background="meta-lime-soft" padding="space-20">
              <Bleed marginInline="space-40 space-0" reflectivePadding asChild>
                <BodyLong>with reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
        </VStack>

        <VStack gap="space-8">
          <p>breakpoints</p>
          <Box
            background="meta-purple-soft"
            padding={{
              xs: "space-8",
              sm: "space-16",
              md: "space-24",
              lg: "space-32",
              xl: "space-40",
            }}
          >
            <Box
              background="meta-lime-soft"
              padding={{
                xs: "space-8",
                sm: "space-16",
                md: "space-24",
                lg: "space-32",
                xl: "space-40",
              }}
            >
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="meta-purple-soft"
            padding={{
              xs: "space-8",
              sm: "space-16",
              md: "space-24",
              lg: "space-32",
              xl: "space-40",
            }}
          >
            <Box
              background="meta-lime-soft"
              padding={{
                xs: "space-8",
                sm: "space-16",
                md: "space-24",
                lg: "space-32",
                xl: "space-40",
              }}
            >
              <Bleed
                marginInline={{
                  xs: "space-16 space-0",
                  sm: "space-32 space-0",
                  md: "space-48 space-0",
                  lg: "space-64 space-0",
                  xl: "space-80 space-0",
                }}
                asChild
              >
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="meta-purple-soft"
            padding={{
              xs: "space-8",
              sm: "space-16",
              md: "space-24",
              lg: "space-32",
              xl: "space-40",
            }}
          >
            <Box
              background="meta-lime-soft"
              padding={{
                xs: "space-8",
                sm: "space-16",
                md: "space-24",
                lg: "space-32",
                xl: "space-40",
              }}
            >
              <Bleed
                marginInline={{
                  xs: "space-16 space-0",
                  sm: "space-32 space-0",
                  md: "space-48 space-0",
                  lg: "space-64 space-0",
                  xl: "space-80 space-0",
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
    <VStack gap="space-16">
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
