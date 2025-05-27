import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import React from "react";
import { VStack } from "../../layout/stack";
import Detail from "../Detail";

const meta: Meta<typeof Detail> = {
  title: "ds-react/Typography/Detail",
  component: Detail,
  decorators: [(story) => <div style={{ maxWidth: "200px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Detail>;

const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

export const Controls: Story = {
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

export const ColorRole: Story = {
  render: () => (
    <VStack gap="2">
      <Detail textColor="default">{lorem}</Detail>
      <Detail textColor="subtle">{lorem}</Detail>
      <Detail data-color="brand-magenta">{lorem}</Detail>
      <Detail data-color="brand-magenta" textColor="default">
        {lorem}
      </Detail>
      <Detail data-color="brand-magenta" textColor="subtle">
        {lorem}
      </Detail>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Spacing</h2>
        {Spacing.render?.(...props)}
      </div>

      <div>
        <h2>Align</h2>
        {Align.render?.(...props)}
      </div>
      <div>
        <h2>Override Tag</h2>
        {OverrideTag.render?.(...props)}
      </div>
      <div>
        <h2>ColorRole</h2>
        {ColorRole.render?.(...props)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
