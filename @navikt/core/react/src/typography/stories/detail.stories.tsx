import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { Detail } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/Detail",
  component: Detail,
  decorators: [(story) => <div style={{ maxWidth: "200px" }}>{story()}</div>],
} satisfies Meta<typeof Detail>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,

    truncate: false,
    visuallyHidden: false,
  },
  argTypes: {
    weight: {
      control: "radio",
      options: ["regular", "semibold"],
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    textColor: {
      control: "radio",
      options: ["default", "subtle"],
    },
  },
};

export const Spacing: Story = {
  render: () => (
    <div>
      <Detail spacing>{lorem}</Detail>
      <Detail spacing>{lorem}</Detail>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <VStack gap="2">
      <Detail textColor="default">{lorem}</Detail>
      <Detail textColor="subtle">{lorem}</Detail>
    </VStack>
  ),
};

export const Align: Story = {
  render: () => (
    <VStack gap="2">
      <Detail align="start">{lorem}</Detail>
      <Detail align="center">{lorem}</Detail>
      <Detail align="end">{lorem}</Detail>
    </VStack>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <Detail spacing>default detail</Detail>
      <Detail as="legend">legend detail</Detail>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultDetail = canvas.getByText("default detail");
    const legendDetail = canvas.getByText("legend detail");

    expect(defaultDetail.tagName).toEqual("P");
    expect(legendDetail.tagName).toEqual("LEGEND");
  },
};
