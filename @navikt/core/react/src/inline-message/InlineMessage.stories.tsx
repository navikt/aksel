import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../layout/stack";
import { Link } from "../link";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";
import { InlineMessage } from "./InlineMessage";

const meta: Meta<typeof InlineMessage> = {
  title: "ds-react/Alert/InlineMessage",
  component: InlineMessage,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof InlineMessage>;

const variants = ["info", "success", "warning", "error"] as const;

export const Default: Story = {
  render: (props) => {
    return (
      <InlineMessage variant={props.variant ?? "warning"}>
        {props.children ?? "InlineMessage content"}
      </InlineMessage>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    variant: "warning",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variants,
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <InlineMessage variant="warning" size="small">
        <DemoContent />
      </InlineMessage>
    );
  },
};

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {variants.map((variant) => (
          <InlineMessage variant={variant} key={variant}>
            <DemoContent />
          </InlineMessage>
        ))}
      </VStack>
    );
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <InlineMessage variant="warning">
        <DemoContent />
      </InlineMessage>
    );
  },
};

export const AsLink: Story = {
  render: () => {
    return (
      <InlineMessage variant="warning" as={Link} href="#">
        This is a link inside the InlineMessage
      </InlineMessage>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Compositions,
  WrappingTitle,
  SizeSmall,
});

export const ChromaticLight = renderStoriesForChromatic({
  Default,
  Compositions,
  WrappingTitle,
  SizeSmall,
});
ChromaticLight.globals = { theme: "light", mode: "darkside" };

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  Compositions,
  WrappingTitle,
  SizeSmall,
});
ChromaticDark.globals = { theme: "dark", mode: "darkside" };

function DemoContent() {
  return (
    <span>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde,
      repudiandae, deleniti exercitationem quod aut veniam sint officiis
      necessitatibus nulla nostrum voluptatem <Link href="#">Test</Link>{" "}
      facilis! Commodi, nobis tempora quibusdam temporibus nulla quam.
    </span>
  );
}
