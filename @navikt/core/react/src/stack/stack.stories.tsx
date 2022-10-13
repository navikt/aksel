import React from "react";
import { Tag } from "..";
import { Stack } from ".";

export default {
  title: "ds-react/Stack",
  component: Stack,
  /* argTypes: {
    variant: {
      defaultValue: "info",
      control: {
        type: "radio",
        options: ["error", "warning", "info", "success"],
      },
    },
  }, */
};

const elements = (
  <>
    <Tag variant="info">Info</Tag>
    <Tag variant="success">success</Tag>
    <Tag variant="error">error</Tag>
    <Tag variant="warning">warning</Tag>
  </>
);

export const Default = (props) => <Stack>{elements}</Stack>;

export const NoWrap = () => <Stack wrap={false}>{elements}</Stack>;
export const Vertical = () => <Stack vertical>{elements}</Stack>;

export const Spacing = () => (
  <div className="colgap">
    <Stack spacing="0">{elements}</Stack>
    <Stack spacing="1">{elements}</Stack>
    <Stack spacing="2">{elements}</Stack>
    <Stack spacing="3">{elements}</Stack>
    <Stack spacing="4">{elements}</Stack>
    <Stack spacing="5">{elements}</Stack>
    <Stack spacing="8">{elements}</Stack>
  </div>
);

export const AlignCenter = () => (
  <Stack align="center">
    <span>Text</span>
    {elements}
  </Stack>
);

export const DistributeFill = () => (
  <Stack distribute="fill">
    <span>message</span>
    {elements}
  </Stack>
);

export const DistributeEvenly = () => (
  <Stack distribute="fillEvenly">
    <span>message</span>
    {elements}
  </Stack>
);
