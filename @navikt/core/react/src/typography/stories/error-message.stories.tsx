import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { ErrorMessage } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/ErrorMessage",
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem =
  "Du må fylle ut: Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
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
