import React from "react";
import type { Meta } from "@storybook/react";
import { BodyLong } from "../../typography";
import { Bleed } from "./Bleed";
import { Box } from "../..";

export default {
  title: "ds-react/Primitives/Bleed",
  component: Bleed,
} satisfies Meta<typeof Bleed>;

export const Default = {
  render: () => (
    <Box background="surface-alt-1-subtle" padding="10">
      <Box background="surface-alt-2-subtle" padding="10">
        <Bleed marginInline="20 0">
          <Box background="surface-success-subtle">
            <BodyLong>
              This is inside a Bleed. Deserunt veniam eu fugiat ad est occaecat
              aliqua nisi aliquip. Aute amet occaecat ex aliqua irure elit
              labore pariatur. Proident pariatur proident pariatur magna
              consequat velit id commodo quis sunt tempor ullamco aliquip
              pariatur.
            </BodyLong>
          </Box>
        </Bleed>
      </Box>
    </Box>
  ),
};
