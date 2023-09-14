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
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="20 0">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline="20 0"</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="0 20">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline="0 20"</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginBlock="20 0">
              <Box background="surface-success-subtle">
                <BodyLong>marginBlock="20 0"</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginBlock="0 20">
              <Box background="surface-success-subtle">
                <HStack className="centered" justify="center" align="center">
                  <Box className="testbox">marginBlock="0 20"</Box>
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
            <BodyLong>marginInline="20 0"</BodyLong>
          </Box>
        </Bleed>
      </Box>
    </Box>
  ),
};

export const full = {
  render: () => (
    <VStack gap="2">
      <Box background="surface-alt-1-subtle" padding="10">
        <Box background="surface-alt-2-subtle" padding="10">
          <Bleed margin="full">
            <Box background="surface-success-subtle">
              <BodyLong>margin="full"</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-1-subtle" padding="10">
        <Box background="surface-alt-2-subtle" padding="10">
          <Bleed marginInline="full">
            <Box background="surface-success-subtle">
              <BodyLong>marginInline="full"</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-1-subtle" padding="10">
        <Box background="surface-alt-2-subtle" padding="10">
          <Bleed marginInline="full 0">
            <Box background="surface-success-subtle">
              <BodyLong>marginInline="full 0"</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
    </VStack>
  ),
};
