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

export const px = {
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

export const full = {
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

export const reflectivePadding = {
  render: () => (
    <>
      <p>
        Only really works <br /> when asChild is implemented
      </p>
      <style>
        {`
        .navds-bleed {
          background-color: var(--a-surface-success-subtle);
        }
        `}
      </style>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed>
              <BodyLong>before Bleed</BodyLong>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="20 0">
              <BodyLong>without reflectivePadding</BodyLong>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed margin="4" marginInline="20 0" reflectivePadding>
              <BodyLong>with reflectivePadding</BodyLong>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
  ),
};
