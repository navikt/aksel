import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import { InlineAlert } from "./InlineAlert";

const meta: Meta<typeof InlineAlert> = {
  title: "ds-react/Alert/InlineAlert",
  component: InlineAlert,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof InlineAlert>;

export const Default: Story = {
  render: (props) => {
    return (
      <InlineAlert variant={props.variant ?? "warning"}>
        {props.children ?? "InlineAlert content"}
      </InlineAlert>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    variant: "warning",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["error", "warning", "success"],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <InlineAlert variant="warning" size="small">
        <DemoContent />
      </InlineAlert>
    );
  },
};

const variants = ["warning", "error", "success"] as const;

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {variants.map((variant) => (
          <InlineAlert variant={variant} key={variant}>
            <DemoContent />
          </InlineAlert>
        ))}
      </VStack>
    );
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <InlineAlert variant="warning">
        <DemoContent />
      </InlineAlert>
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
