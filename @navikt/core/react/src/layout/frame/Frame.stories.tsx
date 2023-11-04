import type { Meta } from "@storybook/react";
import React from "react";
import { BodyLong, Heading } from "../../typography";
import { Box } from "../box";
import { Frame } from "./Frame";

const meta: Meta<typeof Frame> = {
  title: "ds-react/Primitives/Frame",
  component: Frame,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => (
  <Frame width="laptop">
    <Box padding="4" background="surface-subtle">
      <Heading level="1" size="xlarge" spacing>
        Heading
      </Heading>
      <BodyLong>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cumque
        earum qui molestiae distinctio illo fuga eaque aliquam impedit!
        Provident a praesentium, eos inventore veritatis ratione magnam est vero
        dignissimos?
      </BodyLong>
    </Box>
  </Frame>
);
