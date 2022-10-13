import React from "react";
import { Tag } from "..";
import { Stack } from ".";

export default {
  title: "ds-react/layout/Stack",
  component: Stack,
  argTypes: {
    align: {
      control: {
        type: "radio",
        options: ["start", "end", "center", "baseline"],
      },
    },
  },
};

const elements = (
  <>
    <Tag variant="info">Info</Tag>
    <Tag variant="success">success</Tag>
    <Tag variant="error">error</Tag>
    <Tag variant="warning">warning</Tag>
  </>
);

export const Default = (props) => (
  <div style={{ width: "10rem" }}>
    <Stack {...props}>{elements}</Stack>
  </div>
);

Default.args = {
  spacing: "4",
  fullWidth: false,
};

export const Spacing = () => (
  <div className="rowgap">
    <Stack spacing="1">{elements}</Stack>
    <Stack spacing="2">{elements}</Stack>
    <Stack spacing="3">{elements}</Stack>
    <Stack spacing="4">{elements}</Stack>
  </div>
);

export const align = () => (
  <div className="rowgap">
    <Stack align="start">{elements}</Stack>
    <Stack align="center">{elements}</Stack>
    <Stack align="end">{elements}</Stack>
  </div>
);

export const fullWidth = () => (
  <div style={{ width: "10rem" }}>
    <Stack align="start" fullWidth>
      {elements}
    </Stack>
  </div>
);
