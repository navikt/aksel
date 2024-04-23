import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import React from "react";
import { VStack } from "../../layout/stack";
import ErrorMessage from "../ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
  title: "ds-react/Typography/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

const lorem =
  "Du må fylle ut: Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

export const Controls: Story = {
  args: {
    spacing: false,
    children: lorem,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["medium", "small"],
    },
  },
};

export const SizeMedium: Story = {
  render: () => (
    <VStack gap="2">
      <ErrorMessage size="medium">{lorem}</ErrorMessage>
      <ErrorMessage size="medium">{lorem}</ErrorMessage>
    </VStack>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <VStack gap="2">
      <ErrorMessage size="small">{lorem}</ErrorMessage>
      <ErrorMessage size="small">{lorem}</ErrorMessage>
    </VStack>
  ),
};

export const SpacingMedium: Story = {
  render: () => (
    <div>
      <ErrorMessage size="medium" spacing>
        {lorem}
      </ErrorMessage>
      <ErrorMessage size="medium" spacing>
        {lorem}
      </ErrorMessage>
    </div>
  ),
};

export const SpacingSmall: Story = {
  render: () => (
    <div>
      <ErrorMessage size="small" spacing>
        {lorem}
      </ErrorMessage>
      <ErrorMessage size="small" spacing>
        {lorem}
      </ErrorMessage>
    </div>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <ErrorMessage spacing>default errormessage</ErrorMessage>
      <ErrorMessage as="legend">legend errormessage</ErrorMessage>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultErrorMessage = canvas.getByText("default errormessage");
    const legendErrorMessage = canvas.getByText("legend errormessage");

    expect(defaultErrorMessage.tagName).toEqual("P");
    expect(legendErrorMessage.tagName).toEqual("LEGEND");
  },
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Medium</h2>
        <h3>Size</h3>
        {SizeMedium.render?.(...props)}
        <h3>Spacing</h3>
        {SpacingMedium.render?.(...props)}
      </div>
      <div>
        <h2>Small</h2>
        <h3>Size</h3>
        {SizeSmall.render?.(...props)}
        <h3>Spacing</h3>
        {SpacingSmall.render?.(...props)}
      </div>
      <div>
        <h2>Override Tag</h2>
        {OverrideTag.render?.(...props)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
