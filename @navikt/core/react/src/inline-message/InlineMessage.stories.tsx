import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Link } from "../link";
import { VStack } from "../primitives/stack";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import { InlineMessage } from "./index";

const meta: Meta<typeof InlineMessage> = {
  title: "ds-react/InlineMessage",
  component: InlineMessage,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof InlineMessage>;

const statuss = ["info", "success", "warning", "error"] as const;

export const Default: Story = {
  render: (props) => {
    return (
      <InlineMessage status={props.status ?? "warning"}>
        {props.children ?? "InlineMessage content"}
      </InlineMessage>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    status: "warning",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: statuss,
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <InlineMessage status="warning" size="small">
        <DemoContent />
      </InlineMessage>
    );
  },
};

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {statuss.map((status) => (
          <InlineMessage status={status} key={status}>
            <DemoContent />
          </InlineMessage>
        ))}
      </VStack>
    );
  },
};

export const AsLink: Story = {
  render: () => {
    return (
      <InlineMessage status="warning" as={Link} href="#">
        This is a link inside the InlineMessage
      </InlineMessage>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Compositions,
  SizeSmall,
  AsLink,
});

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  Compositions,
  SizeSmall,
  AsLink,
});
ChromaticDark.globals = { theme: "dark" };

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
