import React from "react";
import type { Meta } from "@storybook/react";
import { BodyLong } from "../../typography";
import { Box } from "./Box";

export default {
  title: "ds-react/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export const Default = {
  render: () => (
    <Box padding="4">
      <BodyLong>
        This is inside a box. Deserunt veniam eu fugiat ad est occaecat aliqua
        nisi aliquip. Aute amet occaecat ex aliqua irure elit labore pariatur.
        Proident pariatur proident pariatur magna consequat velit id commodo
        quis sunt tempor ullamco aliquip pariatur.
      </BodyLong>
    </Box>
  ),
};
