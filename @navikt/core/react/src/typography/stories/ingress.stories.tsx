import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { Ingress } from "..";

const meta = {
  title: "ds-react/Typography/deprecated/Ingress",
  component: Ingress,
} satisfies Meta<typeof Ingress>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem =
  "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
  },
};

export const Spacing: Story = {
  render: () => (
    <div>
      <Ingress spacing>{lorem}</Ingress>
      <Ingress spacing>{lorem}</Ingress>
    </div>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <Ingress spacing>default ingress</Ingress>
      <Ingress as="legend">legend ingress</Ingress>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultIngress = canvas.getByText("default ingress");
    const legendIngress = canvas.getByText("legend ingress");

    expect(defaultIngress.tagName).toEqual("P");
    expect(legendIngress.tagName).toEqual("LEGEND");
  },
};
