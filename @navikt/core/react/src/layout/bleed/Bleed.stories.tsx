import React from "react";
import type { Meta } from "@storybook/react";
import { BodyLong } from "../../typography";
import { Bleed } from "./Bleed";
import { Box, HStack, VStack } from "../..";

export default {
  title: "ds-react/Primitives/Bleed",
  component: Bleed,
} satisfies Meta<typeof Bleed>;

export const Default = {
  render: () => (
    <>
      <style>
        {`
        .p {
          padding: 1rem;
        }
      .centered {
        height: auto;
        width: auto;
      }
      .testbox {
        width: auto;
        height: auto;
      }
      `}
      </style>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="10 0">
              <Box className="p" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginInline="0 10">
              <Box className="p" background="surface-success-subtle">
                <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="10 0">
              <Box className="p" background="surface-success-subtle">
                <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="5">
          <Box background="surface-alt-2-subtle" padding="5">
            <Bleed marginBlock="0 10">
              <Box className="p" background="surface-success-subtle">
                <HStack className="centered" justify="center" align="center">
                  <Box className="testbox">marginBlock=&quot;0 10&quot;</Box>
                </HStack>
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
    <Box background="surface-alt-1-subtle" padding="10">
      <Box background="surface-alt-2-subtle" padding="10">
        <Bleed marginInline="px 0">
          <Box background="surface-success-subtle">
            <BodyLong>marginInline=&quot;20 0&quot;</BodyLong>
          </Box>
        </Bleed>
      </Box>
    </Box>
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
        .flex {
          display: flex;
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
      <h3>
        Note: reflectivePadding Only really works <br /> well when asChild is
        implemented
      </h3>
      <h3>Note2: &quot;full&quot; is not supported for marginBlock</h3>
      <HStack gap="3">
        <VStack gap="2">
          <p>CSS string</p>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0">
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0" reflectivePadding>
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
              <Bleed>
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
                  xs: "4",
                  sm: "8",
                  md: "12",
                  lg: "16",
                  xl: "20",
                }}
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
                  xs: "4",
                  sm: "8",
                  md: "12",
                  lg: "16",
                  xl: "20",
                }}
                reflectivePadding
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
